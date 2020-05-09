import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import { Install } from '../../components/Install/Install';
import { LogInScreen } from '../../components/Login/Login';
import { HeaderBar } from '../../components/HeaderBar/HeaderBar';
import { Main } from '../../components/Main/Main';
import { Chat } from '../../components/Chat/Chat';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import { Settings } from '../../components/Settings/Settings';
import { TabBar } from '../../components/TabBar/TabBar';

import { UserDataType } from '../../globalTypes';
import { ITheme } from '../../globalInterfaces';

import { Context } from './appContext';
import { appReducer } from './appReducer';

import { socket } from '../../utils/socketConnection';
import { getUserToken } from '../../utils/pushNotification';
import { themeSelection } from '../../utils/themeSelection';
import { changingStatusBarColor } from '../../utils/changingStatusBarColor';

import fonts from '../../assets/fonts/fonts';

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
  const initialUser: UserDataType = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    group: '',
    groupCode: '',
    course: '',
    userAvatar: '',
  };
  const initialSubscribe = (): boolean => !!localStorage.getItem('isSubscribed');
  const initialTheme = (): string => localStorage.getItem('theme') || 'light';
  const initialState = {
    isLoading: true,
    isLoggedIn: false,
    isInstall: false,
    user: initialUser,
    userName: '',
    groupCode: '',
    userToken: '',
    isSubscribed: initialSubscribe(),
    theme: initialTheme(),
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const isIos = (): boolean => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = (): boolean => {
    return (
      'standalone' in window.navigator && window.matchMedia('(display-mode: standalone)').matches
    );
  };

  useEffect(() => {
    dispatch({ type: 'userName', payload: state.user.userName });
    dispatch({ type: 'groupCode', payload: state.user.groupCode });
  }, [state.user]);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) dispatch({ type: 'isInstall', payload: true });

    getUserToken().then((token) => dispatch({ type: 'userToken', payload: token }));

    if (state.userName?.length && state.groupCode?.length) {
      socket.emit('join', { username: state.userName, group: state.groupCode }, (error: string) => {
        if (error) {
          throw new Error(error);
        }
      });
    }

    return (): void => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [state.userName, state.groupCode]);

  useEffect(() => {
    changingStatusBarColor(state.theme);

    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <Router>
      <Context.Provider value={{ dispatch }}>
        <GlobalStyles />
        <Wrapper theme={state.theme === 'light' ? '' : themeSelection(state.theme)}>
          {state.isLoading && <LoaderScreen />}
          {state.isInstall && !state.isLoading && <Install />}
          {!state.isLoggedIn && !state.isLoading && <LogInScreen />}
          {state.isLoggedIn && !state.isLoading && (
            <>
              <HeaderBar theme={state.theme} />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(): JSX.Element => <Main user={state.user} theme={state.theme} />}
                />
                <Route
                  path="/chat"
                  render={(): JSX.Element => <Chat user={state.user} theme={state.theme} />}
                />
                <Route
                  path="/students-list"
                  render={(): JSX.Element => <StudentsList theme={state.theme} />}
                />
                <Route
                  path="/settings"
                  render={(): JSX.Element => (
                    <Settings
                      user={state.user}
                      userToken={state.userToken}
                      isSubscribed={state.isSubscribed}
                      theme={state.theme}
                    />
                  )}
                />
              </Switch>
              <TabBar theme={state.theme} />
            </>
          )}
        </Wrapper>
      </Context.Provider>
    </Router>
  );
};
