import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { ITabBarProps } from './interfaces';

import { ReactComponent as HomeIcon } from '../../assets/images/svg/home.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/svg/chat.svg';
import { ReactComponent as StudentListIcon } from '../../assets/images/svg/student-list.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings.svg';

const Bar = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 47px;
  padding: 0 16px;
  border-top: 1px solid #f3f3f3;
  background-color: #f9f9f9;
  justify-content: space-between;
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

export const TabBar: React.FC<ITabBarProps> = ({ theme }) => {
  const pathName = useLocation().pathname;

  return (
    <Bar>
      <Tab theme={theme} className={pathName === '/' ? `active-${theme}` : ''}>
        <Link to='/'>
          <HomeIcon className={`icon-${theme}`} />
        </Link>
      </Tab>
      <Tab className={pathName === '/chat' ? `active-${theme}` : ''}>
        <Link to='/chat'>
          <ChatIcon className={`icon-${theme}`} />
        </Link>
      </Tab>
      <Tab className={pathName === '/students-list' ? `active-${theme}` : ''}>
        <Link to='/students-list'>
          <StudentListIcon className={`icon-${theme}`} />
        </Link>
      </Tab>
      <Tab className={pathName === '/settings' ? `active-${theme}` : ''}>
        <Link to='/settings'>
          <SettingsIcon className={`icon-${theme}`} />
        </Link>
      </Tab>
    </Bar>
  );
};
