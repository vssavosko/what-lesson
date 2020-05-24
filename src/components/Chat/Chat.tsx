import React, { useReducer, useRef, useEffect } from 'react';

import styled from 'styled-components';

import { Loader } from '../Loader/Loader';
import { Message } from '../Message/Message';

import { MessageType } from '../../globalTypes';
import { ITheme } from '../../globalInterfaces';
import { IStyledProps, IProps, ITextareaData } from './interfaces';

import { chatReducer } from './chatReducer';

import { initialChatState } from '../../utils/initialData';
import { socket } from '../../utils/socketConnection';
import { getSendingTime } from '../../utils/getSendingTime';

import { ReactComponent as MessageButtonIcon } from '../../assets/images/svg/message-button-icon.svg';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${(props: ITheme): string => props.theme.background};
`;
const ChatWindow = styled.div`
  position: relative;
  display: flex;
  justify-content: ${(props: IStyledProps): string => props.positioning};
  align-items: ${(props: IStyledProps): string => props.positioning};
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
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
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  border-top: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px 10px 0 0;
  padding: 10px 16px;
`;
const MessageTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 33px;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  background-color: ${(props: ITheme): string => props.theme.background};
  border: 0;
  border-radius: 10px;
  padding: 7px 10px;
  resize: none;
  transition: 0.2s;

  &::placeholder {
    color: ${(props: ITheme): string => props.theme.secondTextColor};
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
    stroke: ${(props: ITheme): string => props.theme.mainTextColor};
    transition: 0.2s;
  }

  &:active svg {
    stroke: ${(props: ITheme): string => props.theme.secondTextColor};
    transition: 0.2s;
  }

  @media (min-width: 770px) {
    &:hover svg {
      stroke: ${(props: ITheme): string => props.theme.elementsColorHover};
    }
  }
`;

export const Chat: React.FC<IProps> = ({ userRegistrationData, userAvatar }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const refAnchor = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  let prevDate = '';

  const dateСomparison = (sendingDate: string): boolean => {
    if (sendingDate !== prevDate) {
      prevDate = sendingDate;

      return true;
    }

    return false;
  };

  const scrollToBottom = (): void => {
    if (refAnchor.current) {
      refAnchor.current.scrollIntoView();
    }
  };

  const resizeTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { target, keyCode } = event;

    dispatch({ type: 'textareaData', payload: { target, keyCode } });
  };

  const sendMessage = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    if (state.message.length) {
      const messageData = {
        userName: userRegistrationData.userName,
        userAvatar,
        messageText: state.message,
        sendingDate: state.currentDate,
        sendingTime: getSendingTime(),
      };
      const payload = {
        messageData,
        userGroup: userRegistrationData.groupCode,
        notification: {
          title: 'What Lesson',
          body: messageData.messageText,
          click_action: 'http://localhost:3000/chat',
          icon: 'http://localhost:3000/icon-96.png',
        },
        to: `/topics/${userRegistrationData.groupCode}`,
      };

      socket.emit('sendMessage', messageData, () => {
        if (refTextarea.current) {
          refTextarea.current.value = '';
          refTextarea.current.focus();
        }

        dispatch({ type: 'message', payload: '' });

        scrollToBottom();
      });

      fetch(`http://localhost:5000/sendMessage`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).catch((error) => {
        throw new Error(error);
      });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getMessages`, {
      method: 'POST',
      body: JSON.stringify({ userGroup: userRegistrationData.groupCode }),
    })
      .then((res) => res.json())
      .then((res) => {
        const messages = Object.values(res) as MessageType[];

        dispatch({ type: 'messages', payload: messages });
        dispatch({ type: 'isLoading', payload: false });

        scrollToBottom();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [userRegistrationData]);

  useEffect(() => {
    if (Object.keys(state.textareaData).length) {
      const { target, keyCode } = state.textareaData as ITextareaData;

      if (
        target.clientHeight < 100 ||
        (keyCode === 8 && target.scrollHeight <= target.clientHeight)
      ) {
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }
    }
  }, [state.textareaData]);

  useEffect(() => {
    socket.on('message', (newMessage: MessageType) => {
      dispatch({ type: 'messages', payload: [...state.messages, newMessage] });
    });

    return (): void => {
      socket.off('message');
    };
  }, [state.messages]);

  return (
    <Page>
      <ChatWindow positioning={state.isLoading ? 'center' : ''}>
        {state.isLoading && <Loader />}
        {!state.isLoading && (
          <ChatHistory>
            {state.messages.map((message: MessageType, index: number) => (
              <Message
                key={index}
                currentDate={state.currentDate}
                dateСomparison={(sendingDate: string): boolean => dateСomparison(sendingDate)}
                message={message}
                lastMessage={state.messages.length - 1 === index}
              />
            ))}
            <div ref={refAnchor} />
          </ChatHistory>
        )}
      </ChatWindow>
      <MessageBar>
        <MessageTextarea
          rows={1}
          placeholder="Сообщение"
          onChange={(event): void => dispatch({ type: 'message', payload: event.target.value })}
          onKeyPress={(event): void | boolean =>
            event.key === 'Enter' ? sendMessage(event) : false
          }
          onKeyUp={(event): void => resizeTextarea(event)}
          onKeyDownCapture={(event): void => resizeTextarea(event)}
          ref={refTextarea}
        />
        <MessageButton onClick={(event): void => sendMessage(event)}>
          <MessageButtonIcon />
        </MessageButton>
      </MessageBar>
    </Page>
  );
};
