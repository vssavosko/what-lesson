import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { ReactComponent as HomeIcon } from '../../assets/images/svg/home-icon.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/svg/chat-icon.svg';
import { ReactComponent as StudentListIcon } from '../../assets/images/svg/student-list-icon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings-icon.svg';

const Bar = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 47px;
  padding: 0 16px;
  border-top: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  justify-content: space-between;
  transition: 0.2s;
`;
const Tab = styled.button`
  display: flex;
  width: 93.75px;
  height: 47px;
  background-color: transparent;
  border: 0;
  justify-content: center;
  align-items: center;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover svg g {
    stroke: ${(props: ITheme): string => props.theme.elementsColor};
  }
`;

export const TabBar: React.FC<IProps> = ({ theme }) => {
  const pathName = useLocation().pathname;
  const linkStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Bar>
      <Tab className={pathName === '/' ? `active-${theme}` : `icon-${theme}`}>
        <Link to="/" style={linkStyles}>
          <HomeIcon />
        </Link>
      </Tab>
      <Tab className={pathName === '/chat' ? `active-${theme}` : `icon-${theme}`}>
        <Link to="/chat" style={linkStyles}>
          <ChatIcon />
        </Link>
      </Tab>
      <Tab className={pathName === '/students-list' ? `active-${theme}` : `icon-${theme}`}>
        <Link to="/students-list" style={linkStyles}>
          <StudentListIcon />
        </Link>
      </Tab>
      <Tab className={pathName === '/settings' ? `active-${theme}` : `icon-${theme}`}>
        <Link to="/settings" style={linkStyles}>
          <SettingsIcon />
        </Link>
      </Tab>
    </Bar>
  );
};
