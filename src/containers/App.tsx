import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { TabBar } from '../components/TabBar/TabBar';
import { Main } from '../components/Main/Main';

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

  .icon-light g {
    stroke: rgba(0,0,0,0.5);
    transition: .2s;
  }

  .active-light g {
    stroke: #000;
    transition: .2s;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const App: React.FC = () => {
  const [theme, setTheme] = useState('light');

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <HeaderBar />
        <Switch>
          <Route path='/' exact render={() => <Main />} />
        </Switch>
        <TabBar theme={theme} />
      </Wrapper>
    </Router>
  );
};
