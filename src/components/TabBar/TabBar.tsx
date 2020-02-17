import React from 'react';

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
  border-top: 2px solid #f3f3f3;
  background-color: #f9f9f9;
  justify-content: space-between;
`;
const Tab = styled.button`
  display: flex;
  width: 93.75px;
  height: 47px;
  justify-content: center;
  align-items: center;
  outline: none;
`;

export const TabBar: React.FC<ITabBarProps> = ({ theme }) => {
  const activeScreen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.currentTarget as HTMLElement;
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
      button.classList.remove(`active-${theme}`);
    });

    target.classList.add(`active-${theme}`);
  };

  return (
    <Bar>
      <Tab theme={theme} className={`active-${theme}`} onClick={(event) => activeScreen(event)}>
        <HomeIcon className={`icon-${theme}`} />
      </Tab>
      <Tab onClick={(event) => activeScreen(event)}>
        <ChatIcon className={`icon-${theme}`} />
      </Tab>
      <Tab onClick={(event) => activeScreen(event)}>
        <StudentListIcon className={`icon-${theme}`} />
      </Tab>
      <Tab onClick={(event) => activeScreen(event)}>
        <SettingsIcon className={`icon-${theme}`} />
      </Tab>
    </Bar>
  );
};
