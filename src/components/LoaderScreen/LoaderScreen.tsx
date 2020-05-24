import React, { useContext, useEffect } from 'react';

import styled from 'styled-components';

import { Loader } from '../Loader/Loader';

import { Context } from '../../containers/app/appContext';

import { ReactComponent as CapIcon } from '../../assets/images/svg/cap-icon.svg';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-25deg, #000, #3f435f);
`;

export const LoaderScreen: React.FC = () => {
  const { dispatch } = useContext(Context);

  const checkingFingerprint = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )fingerprint=([^;]+)'));

    return match ? decodeURIComponent(match[2]) : null;
  };

  const fingerprint = checkingFingerprint();

  useEffect(() => {
    fetch('http://localhost:5000/checking_remember_me', {
      method: 'POST',
      body: JSON.stringify({ fingerprint }),
    })
      .then((res) => res.json())
      .then((res) => {
        const {
          authorization,
          key,
          userName,
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
        } = res;

        if (authorization) {
          dispatch({
            type: 'userRegistrationData',
            payload: { userName, groupCode },
          });
          dispatch({
            type: 'user',
            payload: {
              key,
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
        }

        dispatch({
          type: 'isLoading',
          payload: false,
        });
      });
  }, [fingerprint, dispatch]);

  return (
    <Page>
      <CapIcon />
      <Loader customTheme="#7394bf" indents="50px 0 0 0" />
    </Page>
  );
};
