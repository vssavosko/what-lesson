import React, { useState, useEffect, useRef, useCallback } from 'react';

import styled from 'styled-components';

import { Message } from '../Message/Message';

import { IProps, IMessage, IEventInfo } from './interfaces';

import { messageData } from '../../mockData';

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
  padding: 16px 0;
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
  height: 33px;
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

  & svg {
    stroke: #000;
    transition: 0.2s;
  }

  &:active svg {
    stroke: rgba(0, 0, 0, 0.5);
    transition: 0.2s;
  }
`;

export const Chat: React.FC<IProps> = ({ socket }) => {
  const [eventInfo, setEventInfo] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<object[]>(messageData);
  const [indexOfMessage, setIndexOfMessage] = useState(0);

  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ).toISOString();

  const refAnchor = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const timeFormatCheck = (hours: string, minutes: string): string => {
    if (hours.length < 2) {
      hours = `0${hours}`;
    }

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  };

  const findIndexOfMessage = useCallback((): void => {
    let counter = 0;

    messages.forEach((message, index) => {
      const { sendingDate } = message as IMessage;

      if (sendingDate === currentDate && counter === 0) {
        counter++;

        setIndexOfMessage(index);
      }
    });
  }, [messages, currentDate]);

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
      refTextarea.current.focus();
    }
  };

  const scrollToBottom = (): void => {
    if (refAnchor.current) {
      refAnchor.current.scrollIntoView({ behavior: 'smooth' });
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
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      const messageWithSendingDatetime = {
        ...message,
        sendingDate: currentDate,
        sendingTime: timeFormatCheck(hours, minutes),
      };

      setMessages([...messages, messageWithSendingDatetime]);
    });

    if (indexOfMessage === 0) {
      findIndexOfMessage();
    }

    return (): void => {
      socket.off('message');
    };
  }, [socket, messages, currentDate, indexOfMessage, findIndexOfMessage]);

  useEffect(scrollToBottom);

  return (
    <Page>
      <ChatWindow>
        <ChatHistory>
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              lastMessage={messages.length - 1 === index}
              isShowStartDate={indexOfMessage === index}
            />
          ))}
          <div ref={refAnchor} />
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
