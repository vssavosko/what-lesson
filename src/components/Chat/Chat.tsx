import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Message } from '../Message/Message';

import { IProps, IEventInfo } from './interfaces';

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
  color: rgba(0, 0, 0, 0.5);
  padding: 8px 0;
`;
const MessageBar = styled.form`
  position: relative;
  display: flex;
  top: 1px;
  background-color: #f9f9f9;
  border-top: 1px solid #f3f3f3;
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
  transition: 0.2s;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;
const MessageButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 0;
  padding: 0 0 0 16px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Anchor = styled.div``;

export const Chat: React.FC<IProps> = ({ socket }) => {
  const [eventInfo, setEventInfo] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<object[]>([]);

  const refAnchor = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (): void => {
    if (refAnchor.current) {
      refAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resizeTextarea = (event: React.KeyboardEvent): void => {
    const target = event.target as HTMLInputElement;

    setEventInfo({ target, keyCode: event.keyCode });
  };

  const sendMessage = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }

    if (refTextarea.current) {
      refTextarea.current.value = '';
    }
  };

  useEffect(() => {
    if (Object.keys(eventInfo).length) {
      const { target, keyCode } = eventInfo as IEventInfo;

      if (target.clientHeight < 100 || keyCode === 8 || target.value.length === 0) {
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }
    }
  }, [eventInfo]);

  useEffect(() => {
    socket.on('message', (message: object) => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const messageWithSendingTime = { ...message, sendingTime: `${hours}:${minutes}` };

      setMessages([...messages, messageWithSendingTime]);
    });

    return (): void => {
      socket.off('message');
    };
  }, [socket, messages]);

  useEffect(scrollToBottom);

  return (
    <Page>
      <ChatWindow>
        <ChatHistory>
          <MessageDateSent>сегодня</MessageDateSent>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <Anchor ref={refAnchor} />
        </ChatHistory>
      </ChatWindow>
      <MessageBar>
        <MessageTextarea
          rows={1}
          placeholder='Сообщение'
          onChange={(event): void => setMessage(event.target.value)}
          onKeyPress={(event): void | null => (event.key === 'Enter' ? sendMessage(event) : null)}
          onKeyUp={(event): void => resizeTextarea(event)}
          ref={refTextarea}
        />
        <MessageButton onClick={(event): void => sendMessage(event)}>
          <MessageButtonIcon />
        </MessageButton>
      </MessageBar>
    </Page>
  );
};
