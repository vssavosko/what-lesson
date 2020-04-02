import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { themeSelection } from '../../utils/themeSelection';

import { ReactComponent as HomeIcon } from '../../assets/images/svg/home.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/svg/chat.svg';
import { ReactComponent as StudentListIcon } from '../../assets/images/svg/student-list.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings.svg';

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
`;

export const TabBar: React.FC<IProps> = ({ theme }) => {
  const pathName = useLocation().pathname;

  return (
    <ThemeProvider theme={themeSelection(theme)}>
      <Bar>
        <Tab className={pathName === '/' ? `active-${theme}` : `icon-${theme}`}>
          <Link to='/'>
            <HomeIcon />
          </Link>
        </Tab>
        <Tab className={pathName === '/chat' ? `active-${theme}` : `icon-${theme}`}>
          <Link to='/chat'>
            <ChatIcon />
          </Link>
        </Tab>
        <Tab className={pathName === '/students-list' ? `active-${theme}` : `icon-${theme}`}>
          <Link to='/students-list'>
            <StudentListIcon />
          </Link>
        </Tab>
        <Tab className={pathName === '/settings' ? `active-${theme}` : `icon-${theme}`}>
          <Link to='/settings'>
            <SettingsIcon />
          </Link>
        </Tab>
      </Bar>
    </ThemeProvider>
  );
};
