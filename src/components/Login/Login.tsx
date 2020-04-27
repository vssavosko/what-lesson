import React from 'react';

import styled from 'styled-components';

import { IMargin } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { ReactComponent as CapIcon } from '../../assets/images/svg/cap-icon.svg';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-25deg, #000, #3f435f);
`;
const LoginForm = styled.form`
  width: 250px;
`;
const Field = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  font-family: 'SFProTextRegular', sans-serif;
  color: #7394bf;
  background-color: transparent;
  padding: 5px;
  border: 1px solid #7394bf;
  border-radius: 10px;
  margin-top: ${(props: IMargin): string | undefined => props.mt};
  margin-bottom: ${(props: IMargin): string | undefined => props.mb};

  &::placeholder {
    color: #7394bf;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  font-family: 'SFProTextRegular', sans-serif;
  color: #181a24;
  background-color: #7394bf;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  -webkit-appearance: none;
`;

export const LogInScreen: React.FC<IProps> = ({ checkingLogIn }) => {
  const authorization = (event: React.MouseEvent): void => {
    event.preventDefault();

    checkingLogIn(true);
  };
  return (
    <Page>
      <CapIcon />
      <LoginForm>
        <Field mt="30px" mb="20px" placeholder="Логин" />
        <Field mb="20px" placeholder="Пароль" type="password" />
        <SubmitButton
          onClick={(event: React.MouseEvent): void => authorization(event)}
          type="submit"
        >
          войти
        </SubmitButton>
      </LoginForm>
    </Page>
  );
};
