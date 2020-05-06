import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Loader } from '../Loader/Loader';

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

export const LoaderScreen: React.FC<IProps> = ({ loggedIn, changeUserData, stopLoading }) => {
  const checkingFingerprint = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )fingerprint=([^;]+)'));

    return match ? decodeURIComponent(match[2]) : null;
  };

  const [fingerprint] = useState(checkingFingerprint);

  useEffect(() => {
    fetch('http://localhost:5000/checking_remember_me', {
      method: 'POST',
      body: JSON.stringify({ fingerprint }),
    })
      .then((res) => res.json())
      .then((res) => {
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
          fingerprint,
          authorization,
        } = res;

        if (authorization) {
          document.cookie = `fingerprint=${fingerprint}`;

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
        }

        stopLoading();
      });
  }, [fingerprint]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page>
      <CapIcon />
      <Loader indents="50px 0 0 0" />
    </Page>
  );
};
