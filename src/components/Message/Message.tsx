import React from 'react';

import styled from 'styled-components';

import { IStyledProps, IProps, IMessage } from './interfaces';

const MessageDateSent = styled.p`
  font-family: 'SFProTextRegular';
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  padding: 8px 0;
`;
const MessageBlock = styled.div<IStyledProps>`
  display: flex;
  align-items: center;
  max-width: 80%;
  margin-bottom: ${(props: IStyledProps): string | undefined => props.pb}px;
  padding-left: 16px;
`;
const UserPhoto = styled.div`
  width: 32px;
  height: 32px;
  background-color: purple;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
  align-self: flex-end;
`;
const MessageText = styled.div`
  position: relative;
  display: flex;
  min-width: 37px;
  background-color: #f9f9f9;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  border: 1px solid #f3f3f3;
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
  font-family: 'SFProTextRegular';
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

export const Message: React.FC<IProps> = ({ message, lastMessage, isShowStartDate }) => {
  const { text, sendingTime } = message as IMessage;

  return (
    <>
      {isShowStartDate && <MessageDateSent>сегодня</MessageDateSent>}
      <MessageBlock pb={lastMessage ? '0' : '5'}>
        <UserPhoto />
        <MessageText>
          {text}
          <MessageTimeSent>{sendingTime}</MessageTimeSent>
        </MessageText>
      </MessageBlock>
    </>
  );
};
