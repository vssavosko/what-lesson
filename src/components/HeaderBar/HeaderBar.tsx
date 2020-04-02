import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { themeSelection } from '../../utils/themeSelection';

const Header = styled.div`
  display: flex;
  height: 44px;
  border-bottom: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.2s;
`;
const Title = styled.p`
  font-family: SFProTextSemibold, Fallback, sans-serif;
  font-size: 17px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  transition: 0.2s;
`;

export const HeaderBar: React.FC<IProps> = ({ theme }) => {
  return (
    <ThemeProvider theme={themeSelection(theme)}>
      <Header>
        <Title>What Lesson</Title>
      </Header>
    </ThemeProvider>
  );
};
