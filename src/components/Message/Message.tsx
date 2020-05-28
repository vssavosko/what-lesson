import React from 'react';

import styled from 'styled-components';

import { UserAvatarDefault } from '../UserAvatarDefault/UserAvatarDefault';

import { ITheme, IPadding } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { dateFormatting } from '../../utils/dateFormatting';

const MessageDateSent = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  text-align: center;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
  padding: 8px 0;
`;
const MessageBlock = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  margin-bottom: ${(props: IPadding): string | undefined => props.pb};
  padding-left: 16px;
`;
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
  align-self: flex-end;
  overflow: hidden;
`;
const UserAvatarCustom = styled.img`
  width: 100%;
`;
const MessageText = styled.div`
  position: relative;
  display: flex;
  min-width: 37px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px 10px 10px 0;
  padding: 8px 8px 20px 8px;
  word-wrap: normal;
`;
const MessageTimeSent = styled.span`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 35px;
  right: 5px;
  bottom: 5px;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
`;

export const Message: React.FC<IProps> = ({
  currentDate,
  dateСomparison,
  message,
  lastMessage,
}) => {
  const { userName, userAvatar, messageText, sendingDate, sendingTime } = message;

  return (
    <>
      {userName && dateСomparison(sendingDate) && (
        <MessageDateSent>{dateFormatting(sendingDate, currentDate)}</MessageDateSent>
      )}
      {userName && (
        <MessageBlock pb={!lastMessage ? '5px' : '0'}>
          <UserAvatar>
            {userAvatar.length ? (
              <UserAvatarCustom src={userAvatar} />
            ) : (
              <UserAvatarDefault width="28px" height="28px" top="5px" />
            )}
          </UserAvatar>
          <MessageText>
            {messageText}
            <MessageTimeSent>{sendingTime}</MessageTimeSent>
          </MessageText>
        </MessageBlock>
      )}
    </>
  );
};
