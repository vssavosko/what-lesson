import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme, IPadding } from '../../globalInterfaces';
import { IProps, IMessage } from './interfaces';

import { themeSelection } from '../../utils/themeSelection';

const MessageDateSent = styled.p`
  font-family: 'SFProTextRegular';
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
  font-family: 'SFProTextRegular';
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
`;

export const Message: React.FC<IProps> = ({ message, lastMessage, isShowStartDate, theme }) => {
  const { text, sendingTime } = message as IMessage;

  return (
    <ThemeProvider theme={themeSelection(theme)}>
      {isShowStartDate && <MessageDateSent>сегодня</MessageDateSent>}
      <MessageBlock pb={lastMessage ? '0' : '5px'}>
        <UserPhoto />
        <MessageText>
          {text}
          <MessageTimeSent>{sendingTime}</MessageTimeSent>
        </MessageText>
      </MessageBlock>
    </ThemeProvider>
  );
};
