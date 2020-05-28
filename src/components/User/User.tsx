import React from 'react';

import styled from 'styled-components';

import { UserAvatarDefault } from '../UserAvatarDefault/UserAvatarDefault';

import { ITheme } from '../../globalInterfaces';
import { IStyledProps, IProps } from './interfaces';

const UserBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 90px;
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 15px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  margin-bottom: 16px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;
const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
`;
const UserAvatarCustom = styled.img`
  width: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserText = styled.p`
  font-family: ${(props: IStyledProps): string | undefined => `'${props.ff}'`}, sans-serif;
  font-size: 15px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  margin-bottom: ${(props: IStyledProps): string | undefined => props.mb};
`;

export const User: React.FC<IProps> = ({ userAvatar, firstName, lastName, email, phoneNumber }) => {
  return (
    <>
      {(firstName && email) || phoneNumber ? (
        <UserBlock>
          <UserAvatar>
            {userAvatar.length ? <UserAvatarCustom src={userAvatar} /> : <UserAvatarDefault />}
          </UserAvatar>
          <UserInfo>
            <UserText ff="SFProTextSemibold" mb="4px">
              {firstName} {lastName || ''}
            </UserText>
            {email && (
              <UserText ff="SFProTextRegular" mb={phoneNumber ? '6px' : '0'}>
                {email}
              </UserText>
            )}
            {phoneNumber && <UserText ff="SFProTextRegular">{phoneNumber}</UserText>}
          </UserInfo>
        </UserBlock>
      ) : (
        false
      )}
    </>
  );
};
