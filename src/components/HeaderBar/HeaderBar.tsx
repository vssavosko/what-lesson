import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { ITheme } from '../../globalInterfaces';

import { ReactComponent as Documents } from '../../assets/images/svg/documents-icon.svg';

const Header = styled.div`
  position: relative;
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
const DocumentsButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 5px;
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover path {
    stroke: ${(props: ITheme): string => props.theme.elementsColor};
  }
`;
const DocumentsLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;
const DocumentsIcon = styled(Documents)`
  width: 30px;
  height: 100%;

  & path {
    stroke: ${(props: ITheme): string =>
      useLocation().pathname === '/documents'
        ? props.theme.elementsColor
        : props.theme.secondTextColor};
    transition: 0.2s;
  }
`;

export const HeaderBar: React.FC = () => {
  return (
    <Header>
      <Title>What Lesson</Title>
      <DocumentsButton type="button">
        <DocumentsLink to="/documents">
          <DocumentsIcon />
        </DocumentsLink>
      </DocumentsButton>
    </Header>
  );
};
