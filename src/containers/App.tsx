import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { Main } from '../components/Main/Main';
import { Chat } from '../components/Chat/Chat';
import { StudentsList } from '../components/StudentsList/StudentsList';
import { Settings } from '../components/Settings/Settings';
import { TabBar } from '../components/TabBar/TabBar';

import { socket } from '../utils/socketConnection';
import { userData } from '../utils/mockData';

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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

export const App: React.FC = () => {
  const [user] = useState(userData);
  const [theme, setTheme] = useState('');

  const changeTheme = (theme: string): void => setTheme(theme);

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    setTheme(theme !== null ? theme : 'light');

    socket.emit('join', { username: user.userName, group: user.group }, (error: string) => {
      if (error) {
        throw new Error(error);
      }
    });

    return (): void => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [user]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <HeaderBar theme={theme} />
        <Switch>
          <Route path='/' exact render={(): JSX.Element => <Main user={user} theme={theme} />} />
          <Route path='/chat' render={(): JSX.Element => <Chat theme={theme} />} />
          <Route path='/students-list' render={(): JSX.Element => <StudentsList theme={theme} />} />
          <Route
            path='/settings'
            render={(): JSX.Element => (
              <Settings user={user} theme={theme} changeTheme={changeTheme} />
            )}
          />
        </Switch>
        <TabBar theme={theme} />
      </Wrapper>
    </Router>
  );
};
