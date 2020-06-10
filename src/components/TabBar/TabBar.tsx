import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { Home, Chat, ClipboardList } from '@styled-icons/heroicons-outline';
import { Settings } from '@styled-icons/feather';

import { ITheme } from '../../globalInterfaces';

const Bar = styled.div`
  display: flex;
  min-height: 44px;
  padding: 0 16px;
  border-top: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  justify-content: space-between;
  transition: 0.2s;
`;
const Tab = styled.button`
  width: 93.75px;
  height: 44px;
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover svg {
    stroke: ${(props: ITheme): string => props.theme.elementsColor};
  }
`;
const TabLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const HomeIcon = styled(Home)`
  width: 30px;
  stroke: ${(props: ITheme): string =>
    useLocation().pathname === '/' ? props.theme.elementsColor : props.theme.secondTextColor};
  transition: 0.2s;

  & path {
    stroke-width: 1;
  }
`;
const ChatIcon = styled(Chat)`
  width: 30px;
  stroke: ${(props: ITheme): string =>
    useLocation().pathname === '/chat' ? props.theme.elementsColor : props.theme.secondTextColor};
  transition: 0.2s;

  & path {
    stroke-width: 1;
  }
`;
const StudentListIcon = styled(ClipboardList)`
  width: 30px;
  stroke: ${(props: ITheme): string =>
    useLocation().pathname === '/students-list'
      ? props.theme.elementsColor
      : props.theme.secondTextColor};
  transition: 0.2s;

  & path {
    stroke-width: 1;
  }
`;
const SettingsIcon = styled(Settings)`
  width: 25px;
  stroke: ${(props: ITheme): string =>
    useLocation().pathname === '/settings'
      ? props.theme.elementsColor
      : props.theme.secondTextColor};
  transition: 0.2s;
`;

export const TabBar: React.FC = () => {
  return (
    <Bar>
      <Tab type="button" aria-label="Routing to main page">
        <TabLink to="/">
          <HomeIcon />
        </TabLink>
      </Tab>
      <Tab type="button" aria-label="Routing to chat page">
        <TabLink to="/chat">
          <ChatIcon />
        </TabLink>
      </Tab>
      <Tab type="button" aria-label="Routing to students-list page">
        <TabLink to="/students-list">
          <StudentListIcon />
        </TabLink>
      </Tab>
      <Tab type="button" aria-label="Routing to settings page">
        <TabLink to="/settings">
          <SettingsIcon />
        </TabLink>
      </Tab>
    </Bar>
  );
};
