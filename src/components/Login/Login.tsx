import React, { useContext, useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Loader } from '../Loader/Loader';

import { IMargin } from '../../globalInterfaces';

import { Context } from '../../containers/app/appContext';

import { host } from '../../utils/hostCheck';

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

export const LogInScreen: React.FC = () => {
  const { dispatch } = useContext(Context);

  const [isAuthorizationAttempt, setIsAuthorizationAttempt] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const authorization = (event: React.MouseEvent): void => {
    event.preventDefault();

    setIsAuthorizationAttempt(true);
  };

  const toggleCheckbox = (): void => setIsChecked(!isChecked);

  useEffect(() => {
    if (isAuthorizationAttempt) {
      const payload = {
        email: refEmail?.current?.value,
        password: refPassword?.current?.value,
      };

      fetch(`${host().api}/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.authorization && !res.error) {
            const {
              key,
              userName,
              role,
              userAvatar,
              firstName,
              lastName,
              email,
              phoneNumber,
              course,
              group,
              groupCode,
              schedule,
              listOfStudents,
              fingerprint,
            } = res;

            if (isChecked && !fingerprint.length) {
              const payload = {
                key,
                email,
                token: btoa(`${email} ${key} ${window.navigator.userAgent}`),
              };

              fetch(`${host().api}/generating_fingerprint`, {
                method: 'POST',
                body: JSON.stringify(payload),
              })
                .then((res): Promise<{ fingerprint: string }> => res.json())
                .then((res): void => {
                  const payload = {
                    key,
                    name: 'fingerprint',
                    value: res.fingerprint,
                  };

                  fetch(`${host().api}/update_user_profile`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                  }).then(() => {
                    document.cookie = `fingerprint=${res.fingerprint}`;
                  });
                });
            } else if (isChecked && fingerprint.length) {
              document.cookie = `fingerprint=${fingerprint}`;
            }

            dispatch({
              type: 'host',
              payload: host(),
            });
            dispatch({
              type: 'userRegistrationData',
              payload: { userName, groupCode },
            });
            dispatch({
              type: 'user',
              payload: {
                key,
                role,
                userAvatar,
                firstName,
                lastName,
                email,
                phoneNumber,
                course,
                group,
              },
            });
            dispatch({
              type: 'schedule',
              payload: schedule,
            });
            dispatch({
              type: 'listOfStudents',
              payload: listOfStudents,
            });
            dispatch({
              type: 'isLoggedIn',
              payload: true,
            });
          } else {
            setIsAuthorizationAttempt(false);
            setError(res.error);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [isAuthorizationAttempt, isChecked, dispatch]);

  return (
    <Page>
      <CapIcon />
      <LoginForm>
        <Field mt="30px" mb="20px" type="email" placeholder="E-mail" ref={refEmail} />
        <Field mb={error ? '20px' : ''} type="password" placeholder="Пароль" ref={refPassword} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <RememberMeBlock>
          <RememberMeLabel onClick={toggleCheckbox}>Запомнить меня</RememberMeLabel>
          <RememberMeCheckbox checkboxState={isChecked} onClick={toggleCheckbox} />
        </RememberMeBlock>
        <SubmitButton
          onClick={(event: React.MouseEvent): void => authorization(event)}
          type="submit"
          disabled={isAuthorizationAttempt}
        >
          {isAuthorizationAttempt ? <Loader customTheme="#181a24" /> : 'войти'}
        </SubmitButton>
      </LoginForm>
    </Page>
  );
};
