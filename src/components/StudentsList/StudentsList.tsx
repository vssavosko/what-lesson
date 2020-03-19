import React from 'react';

import styled from 'styled-components';

import { IStyledProps } from './interfaces';

import { studentsData } from '../../mockData';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #f3f3f3;
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
const UserText = styled.p<IStyledProps>`
  font-family: ${(props: IStyledProps): string | undefined => `'${props.ff}'`}, sans-serif;
  font-size: 15px;
`;

export const StudentsList: React.FC = () => {
  return (
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
  );
};
