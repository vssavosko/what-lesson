import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import io from 'socket.io-client';
import queryString from 'query-string';

import { Message } from '../Message/Message';

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

let socket: SocketIOClient.Socket;

export const Chat: React.FC = () => {
  const [eventInfo, setEventInfo] = useState({});
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<object[]>([]);

  const ENDPOINT = 'localhost:5000';

  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLInputElement;

    setEventInfo({ target, keyCode: event.keyCode });
  };

  const sendMessage = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }

    if (refTextarea.current) {
      refTextarea.current.value = '';
    }
  };

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search) as { name: string; room: string };

    socket = io(ENDPOINT);

    // setName(name);
    // setRoom(room);

    socket.emit('join', { name, room }, (error: string) => {
      if (error) {
        throw new Error(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [ENDPOINT]);

  useEffect(() => {
    if (Object.keys(eventInfo).length) {
      const { target, keyCode } = eventInfo as { target: HTMLInputElement; keyCode: number };

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
  }, [messages]);

  return (
    <Page>
      <ChatWindow>
        <ChatHistory>
          <MessageDateSent>сегодня</MessageDateSent>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </ChatHistory>
      </ChatWindow>
      <MessageBar>
        <MessageTextarea
          rows={1}
          placeholder='Сообщение'
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event => (event.key === 'Enter' ? sendMessage(event) : null)}
          onKeyUp={event => resizeTextarea(event)}
          ref={refTextarea}
        />
        <MessageButton onClick={event => sendMessage(event)}>
          <MessageButtonIcon />
        </MessageButton>
      </MessageBar>
    </Page>
  );
};
