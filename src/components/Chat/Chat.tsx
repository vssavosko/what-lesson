import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { ReactComponent as MessageButtonIcon } from '../../assets/images/svg/message-button-icon.svg';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
`;
const ChatWindow = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
`;
const ChatHistory = styled.div`
  position: absolute;
  width: 100%;
  padding-bottom: 16px;
`;
const MessageDateSent = styled.p`
  font-family: 'SFProTextRegular';
  font-size: 12px;
  text-align: center;
  color: rgba(0,0,0,0.5);
  padding: 8px 0;
`;
const Message = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  margin-bottom: 5px;
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
  width: 100%;
  background-color: #F9F9F9;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  border: 1px solid #F3F3F3;
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
  color: rgba(0,0,0,0.5);
`;
const MessageBar = styled.form`
  position: relative;
  display: flex;
  top: 1px;
  background-color: #F9F9F9;
  border-top: 1px solid #F3F3F3;
  border-radius: 10px 10px 0 0;
  padding: 10px 16px;
`;
const MessageTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 7px 10px;
  resize: none;
  transition: .2s;

  &::placeholder {
    color: rgba(0,0,0,0.5);
  }
`;
const MessageButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 0;
  padding: 0 0 0 16px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`;

export const Chat: React.FC = () => {
  const [eventInfo, setEventInfo] = useState();

  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;

    setEventInfo({ target, keyCode: event.keyCode });
  };

  useEffect(() => {
    if (eventInfo && (eventInfo.target.clientHeight < 100 || eventInfo.keyCode === 8 || eventInfo.target.value.length === 0)) {
      eventInfo.target.style.height = 'auto';
      eventInfo.target.style.height = `${eventInfo.target.scrollHeight}px`;
    }
  });

  return (
    <Page>
      <ChatWindow>
        <ChatHistory>
          <MessageDateSent>сегодня</MessageDateSent>
          <Message>
            <UserPhoto>
            </UserPhoto>
            <MessageText>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa ad quasi sunt veniam? Odio, officia obcaecati molestias temporibus quasi eos minima eius neque quibusdam quidem dolore fugit perferendis asperiores iusto?
              <MessageTimeSent>20:23</MessageTimeSent>
            </MessageText>
          </Message>
          <Message>
            <UserPhoto>
            </UserPhoto>
            <MessageText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, numquam harum velit alias excepturi
              <MessageTimeSent>20:23</MessageTimeSent>
            </MessageText>
          </Message>
        </ChatHistory>
      </ChatWindow>
      <MessageBar>
        <MessageTextarea
          rows={1}
          placeholder="Сообщение"
          onKeyUp={event => resizeTextarea(event)}
          ref={refTextarea} />
        <MessageButton type="submit">
          <MessageButtonIcon />
        </MessageButton>
      </MessageBar>
    </Page>
  );
}