import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme } from '../../globalInterfaces';
import { IStyledProps, IProps } from './interfaces';

import { themeSelection } from '../../utils/themeSelection';
import { studentsData } from '../../utils/mockData';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${(props: ITheme): string => props.theme.background};
  padding: 0 16px;
`;
const StudentsWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.div`
  position: absolute;
  width: 100%;
  padding: 16px 0;
`;
const User = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 90px;
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 15px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: purple;
  border-radius: 50%;
  margin-right: 15px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UserText = styled.p`
  font-family: ${(props: IStyledProps): string | undefined => `'${props.ff}'`}, sans-serif;
  font-size: 15px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
`;

export const StudentsList: React.FC<IProps> = ({ theme }) => {
  return (
    <ThemeProvider theme={themeSelection(theme)}>
      <Page>
        <StudentsWindow>
          <List>
            {studentsData.map((student, index) => (
              <User key={index}>
                <UserIcon />
                <UserInfo>
                  <UserText ff='SFProTextSemibold'>{student.username}</UserText>
                  <UserText ff='SFProTextRegular'>{student.email}</UserText>
                  <UserText ff='SFProTextRegular'>{student.phoneNumber}</UserText>
                </UserInfo>
              </User>
            ))}
          </List>
        </StudentsWindow>
      </Page>
    </ThemeProvider>
  );
};
