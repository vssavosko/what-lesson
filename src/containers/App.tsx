import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import { LoaderScreen } from '../components/LoaderScreen/LoaderScreen';
import { Install } from '../components/Install/Install';
import { LogInScreen } from '../components/Login/Login';
import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { Main } from '../components/Main/Main';
import { Chat } from '../components/Chat/Chat';
import { StudentsList } from '../components/StudentsList/StudentsList';
import { Settings } from '../components/Settings/Settings';
import { TabBar } from '../components/TabBar/TabBar';

import { UserData } from '../globalTypes';
import { ITheme } from '../globalInterfaces';

import { socket } from '../utils/socketConnection';
import { subscriptionRequest } from '../utils/push-notification';
import { themeSelection } from '../utils/themeSelection';
import { changingStatusBarColor } from '../utils/changingStatusBarColor';

import fonts from '../assets/fonts/fonts';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'SFProTextRegular';
    src: url(${fonts.SFProTextRegularWoff}) format('woff'),
      url(${fonts.SFProTextRegularTtf}) format('truetype');
  }

  @font-face {
    font-family: 'SFProTextSemibold';
    src: url(${fonts.SFProTextSemiboldWoff}) format('woff'),
      url(${fonts.SFProTextSemiboldTtf}) format('truetype');
  }

  @font-face {
    font-family: 'SFProDisplayRegular';
    src: url(${fonts.SFProDisplayRegularWoff}) format('woff'),
      url(${fonts.SFProDisplayRegularTtf}) format('truetype');
  }

  @font-face {
    font-family: 'SFProDisplaySemibold';
    src: url(${fonts.SFProDisplaySemiboldWoff}) format('woff'),
      url(${fonts.SFProDisplaySemiboldTtf}) format('truetype');
  }

  body {
    position: fixed;
    width: 100%;
    overflow: hidden;
    transition: 0.2s;
  }

  .icon-light g {
    stroke: rgba(0,0,0,0.5);
    transition: .2s;
  }

  .icon-dark g {
    stroke: #c0c0c0;
    transition: .2s;
  }

  .icon-night-blue g {
    stroke: #abafb4;
    transition: .2s;
  }

  .active-light g {
    stroke: #000;
    transition: .2s;
  }

  .active-dark g {
    stroke: #fefefe;
    transition: .2s;
  }

  .active-night-blue g {
    stroke: #5488ba;
    transition: .2s;
  }

  .tab-enter-done {
    transform: scale(0.9);
  }

  .tab-exit-done {
    transform: none;
  }

  .schedule-enter-done {
    transform: translateY(0);
  }

  .schedule-exit-done {
    transform: translateY(${window.innerHeight}px);
  }
`;
const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  transition: 0.2s;

  @media (min-width: 1000px) {
    border-radius: 25px;
    box-shadow: 0 0 20px 5px ${(props: ITheme): string => props.theme.background};
  }
`;

export const App: React.FC = () => {
  const initialUser = (): UserData => ({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    group: '',
    groupCode: '',
    course: '',
    userAvatar: '',
  });
  const initialTheme = (): string => localStorage.getItem('theme') || 'light';

  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appInstallation, setAppInstallation] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [userName, setUserName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [userToken, setUserToken] = useState('');
  const [theme, setTheme] = useState(initialTheme);

  const isIos = (): boolean => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = (): boolean => {
    return (
      'standalone' in window.navigator && window.matchMedia('(display-mode: standalone)').matches
    );
  };

  const authorization = (): void => setLoggedIn(true);

  const changeUserData = (userData: UserData): void => setUser(userData);

  const stopLoading = (): void => setIsLoading(false);

  const closeInstall = (): void => setAppInstallation(false);

  const changeTheme = (theme: string): void => setTheme(theme);

  useEffect(() => {
    setUserName(user.userName);
    setGroupCode(user.groupCode);
  }, [user]);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) setAppInstallation(true);

    subscriptionRequest().then((token) => setUserToken(token || ''));

    if (userName?.length && groupCode?.length) {
      socket.emit('join', { username: userName, group: groupCode }, (error: string) => {
        if (error) {
          throw new Error(error);
        }
      });
    }

    return (): void => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [userName, groupCode]);

  useEffect(() => {
    changingStatusBarColor(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper theme={theme === 'light' ? '' : themeSelection(theme)}>
        {isLoading && (
          <LoaderScreen
            loggedIn={authorization}
            changeUserData={(userData: UserData): void => changeUserData(userData)}
            stopLoading={stopLoading}
          />
        )}
        {appInstallation && !isLoading && <Install close={closeInstall} />}
        {!loggedIn && !isLoading && (
          <LogInScreen
            loggedIn={authorization}
            changeUserData={(userData: UserData): void => changeUserData(userData)}
          />
        )}
        {loggedIn && !isLoading && (
          <>
            <HeaderBar theme={theme} />
            <Switch>
              <Route
                path="/"
                exact
                render={(): JSX.Element => <Main user={user} theme={theme} />}
              />
              <Route path="/chat" render={(): JSX.Element => <Chat user={user} theme={theme} />} />
              <Route
                path="/students-list"
                render={(): JSX.Element => <StudentsList theme={theme} />}
              />
              <Route
                path="/settings"
                render={(): JSX.Element => (
                  <Settings
                    user={user}
                    userToken={userToken}
                    theme={theme}
                    changeTheme={changeTheme}
                  />
                )}
              />
            </Switch>
            <TabBar theme={theme} />
          </>
        )}
      </Wrapper>
    </Router>
  );
};
