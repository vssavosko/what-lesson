import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';
import io from 'socket.io-client';

import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { Main } from '../components/Main/Main';
import { Chat } from '../components/Chat/Chat';
import { StudentsList } from '../components/StudentsList/StudentsList';
import { TabBar } from '../components/TabBar/TabBar';

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

  .active-light g {
    stroke: #000;
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
  const [username, setUsername] = useState('vssavosko'); //eslint-disable-line
  const [group, setGroup] = useState('PI4-1'); //eslint-disable-line
  const [theme] = useState('light');

  const ENDPOINT = 'localhost:5000';

  const socket: SocketIOClient.Socket = io(ENDPOINT);

  useEffect(() => {
    socket.emit('join', { username, group }, (error: string) => {
      if (error) {
        throw new Error(error);
      }
    });

    return (): void => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [ENDPOINT, socket, username, group]);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <HeaderBar />
        <Switch>
          <Route path='/' exact render={(): JSX.Element => <Main />} />
          <Route path='/chat' render={(): JSX.Element => <Chat socket={socket} />} />
          <Route path='/students-list' render={(): JSX.Element => <StudentsList />} />
        </Switch>
        <TabBar theme={theme} />
      </Wrapper>
    </Router>
  );
};
