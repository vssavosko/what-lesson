import React from 'react';

import styled from 'styled-components';

import { ITheme } from '../../globalInterfaces';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  border-bottom: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  z-index: 2;
  transition: 0.2s;
`;
const Title = styled.p`
  font-family: SFProTextSemibold, Fallback, sans-serif;
  font-size: 17px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  transition: 0.2s;
`;

export const HeaderBar: React.FC = () => {
  return (
    <Header>
      <Title>What Lesson</Title>
    </Header>
  );
};
