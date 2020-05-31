import React from 'react';

import styled from 'styled-components';

import { User } from '../User/User';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${(props: ITheme): string => props.theme.background};
`;
const StudentsWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 1000px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const List = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 16px;
`;

export const ListOfStudents: React.FC<IProps> = ({ students }) => {
  return (
    <Page>
      <StudentsWindow>
        <List>
          {students.map((student, index) => (
            <User
              key={index}
              userAvatar={student.userAvatar}
              firstName={student.firstName}
              lastName={student.lastName}
              email={student.email}
              phoneNumber={student.phoneNumber}
            />
          ))}
        </List>
      </StudentsWindow>
    </Page>
  );
};
