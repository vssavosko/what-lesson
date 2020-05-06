import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Loader } from '../Loader/Loader';

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
  width: 265px;
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
const ErrorMessage = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  color: #ed4956;
`;
const RememberMeBlock = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
const RememberMeLabel = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  color: #7394bf;
  margin-right: 10px;
  cursor: pointer;
`;
const RememberMeCheckbox = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  background: transparent;
  border: 1px solid #7394bf;
  border-radius: 5px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 5px;
    top: 6px;
    right: 9px;
    background: #7394bf;
    transform: rotate(-42deg)
      ${(props: { checkboxState: boolean }): string =>
        props.checkboxState ? 'scale(1)' : 'scale(0.5)'};
    opacity: ${(props: { checkboxState: boolean }): string => (props.checkboxState ? '1' : '0')};
    transition: 0.3s;
  }

  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 9px;
    top: 3px;
    right: 5px;
    background: #7394bf;
    transform: rotate(42deg)
      ${(props: { checkboxState: boolean }): string =>
        props.checkboxState ? 'scale(1)' : 'scale(0.1)'};
    opacity: ${(props: { checkboxState: boolean }): string => (props.checkboxState ? '1' : '0')};
    transition: 0.3s;
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

export const LogInScreen: React.FC<IProps> = ({ loggedIn, changeUserData }) => {
  const [authorizationAttempt, setAuthorizationAttempt] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const authorization = (event: React.MouseEvent): void => {
    event.preventDefault();

    setAuthorizationAttempt(true);
  };

  const toggleCheckbox = (): void => setIsChecked(!isChecked);

  useEffect(() => {
    if (authorizationAttempt) {
      const payload = {
        email: refEmail?.current?.value,
        password: refPassword?.current?.value,
      };

      fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          const user = res;

          if (user.authorization) {
            const {
              course,
              email,
              firstName,
              group,
              groupCode,
              lastName,
              phoneNumber,
              userAvatar,
              userName,
            } = user;

            if (isChecked && !user.fingerprint.length) {
              const payload = {
                key: user.key,
                email: user.email,
                token: btoa(`${user.email} ${user.key} ${window.navigator.userAgent}`),
              };

              fetch(`http://localhost:5000/generating_fingerprint`, {
                method: 'POST',
                body: JSON.stringify(payload),
              })
                .then((res): Promise<{ fingerprint: string }> => res.json())
                .then((res): void => {
                  const payload = {
                    key: user.key,
                    fingerprint: res.fingerprint,
                  };

                  fetch(`http://localhost:5000/update_user_profile`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                  }).then(() => {
                    document.cookie = `fingerprint=${res.fingerprint}`;
                  });
                });
            } else if (isChecked && user.fingerprint.length) {
              document.cookie = `fingerprint=${user.fingerprint}`;
            }

            loggedIn();
            changeUserData({
              course,
              email,
              firstName,
              group,
              groupCode,
              lastName,
              phoneNumber,
              userAvatar,
              userName,
            });
          } else {
            setAuthorizationAttempt(false);
            setIsError(true);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [authorizationAttempt, isChecked, loggedIn, changeUserData]);

  return (
    <Page>
      <CapIcon />
      <LoginForm>
        <Field mt="30px" mb="20px" type="email" placeholder="E-mail" ref={refEmail} />
        <Field mb={isError ? '20px' : ''} type="password" placeholder="Пароль" ref={refPassword} />
        {isError && <ErrorMessage>Неправильный Email или Пароль.</ErrorMessage>}
        <RememberMeBlock>
          <RememberMeLabel onClick={toggleCheckbox}>Запомнить меня</RememberMeLabel>
          <RememberMeCheckbox checkboxState={isChecked} onClick={toggleCheckbox} />
        </RememberMeBlock>
        <SubmitButton
          onClick={(event: React.MouseEvent): void => authorization(event)}
          type="submit"
          disabled={authorizationAttempt}
        >
          {authorizationAttempt ? <Loader customTheme="#181a24" /> : 'войти'}
        </SubmitButton>
      </LoginForm>
    </Page>
  );
};
