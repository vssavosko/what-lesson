import React, { useContext, useState, useRef } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme, IMargin } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { Loader } from '../Loader/Loader';

import { Context } from '../../containers/app/appContext';

import { themeSelection } from '../../utils/themeSelection';

import UserAvatar from '../../assets/images/user-avatar.png';
import { ReactComponent as UserIconDefault } from '../../assets/images/svg/user-icon.svg';

const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props: ITheme): string => props.theme.background};
  overflow-y: scroll;
  transition: 0.2s;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SettingsWindow = styled.div`
  position: absolute;
  width: 100%;
  padding: 16px 0;
`;
const UserInfoPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserIcon = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 16px;
  overflow: hidden;
  cursor: pointer;
`;
const UserIconCustom = styled.img`
  position: relative;
  max-width: 100%;
  z-index: 2;
`;
const UserIconChangeLabel = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 15px;
  bottom: 0;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 3px;
  z-index: 3;
`;
const UploadIcon = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
`;
const UserName = styled.p`
  width: 100%;
  font-family: 'SFProTextSemibold', sans-serif;
  font-size: 18px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  text-align: center;
  margin-bottom: 5px;
  transition: 0.2s;
`;
const UserContacts = styled.p`
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
  text-align: center;
  margin-bottom: 3px;
  transition: 0.2s;
`;
const UserDetails = styled.div`
  width: 100%;
  padding-top: 16px;
`;
const Field = styled.div`
  padding: 0 16px;
  margin-bottom: ${(props: IMargin): string | undefined => props.mb};
  transition: 0.2s;
`;
const Label = styled.div`
  padding: 0 0 3px 7px;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
  transition: 0.2s;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 5px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  transition: 0.2s;
  -webkit-appearance: none;
`;
const SeparationHeader = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  padding-left: 22px;
  margin: 14px 0;
  text-transform: uppercase;
  transition: 0.2s;
`;
const Select = styled.select`
  box-sizing: border-box;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 5px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  transition: 0.2s;
  -webkit-appearance: none;
`;
const SubscriptionButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 5px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  transition: 0.2s;
  -webkit-appearance: none;

  @media (min-width: 415px) {
    width: 200px;
  }
`;

export const Settings: React.FC<IProps> = ({ user, userToken, isSubscribed, theme }) => {
  const { dispatch } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  const refUploadIcon = useRef<HTMLInputElement>(null);

  const changeUserIcon = (): void => refUploadIcon.current?.click();

  const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch({ type: 'theme', payload: event.target.value });
  };

  const subscribe = (): void => {
    setIsLoading(true);

    fetch(`http://localhost:5000/subscribe`, {
      method: 'POST',
      body: JSON.stringify({
        userToken,
        userGroup: user.groupCode,
      }),
    })
      .then(() => {
        localStorage.setItem('isSubscribed', userToken);

        dispatch({ type: 'isSubscribed', payload: true });

        setIsLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const unsubscribe = (): void => {
    setIsLoading(true);

    fetch(`http://localhost:5000/unsubscribe`, {
      method: 'POST',
      body: JSON.stringify({
        userToken,
        userGroup: user.groupCode,
      }),
    })
      .then(() => {
        localStorage.removeItem('isSubscribed');

        dispatch({ type: 'isSubscribed', payload: false });

        setIsLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <ThemeProvider theme={themeSelection(theme)}>
      <Page>
        <SettingsWindow>
          <UserInfoPreview>
            <UserIcon onClick={changeUserIcon}>
              {UserAvatar ? <UserIconCustom src={UserAvatar} /> : <UserIconDefault />}
              <UserIconChangeLabel>правка</UserIconChangeLabel>
              <UploadIcon type="file" ref={refUploadIcon} />
            </UserIcon>
            <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
            <UserContacts>e-mail: {user.email}</UserContacts>
            <UserContacts>телефон: {user.phoneNumber}</UserContacts>
          </UserInfoPreview>
          <UserDetails>
            <Field mb="14px">
              <Label>Имя</Label>
              <Input name="firstName" defaultValue={user.firstName} />
            </Field>
            <Field mb="14px">
              <Label>Фамилия</Label>
              <Input name="lastName" defaultValue={user.lastName} />
            </Field>
            <Field mb="14px">
              <Label>E-mail</Label>
              <Input name="email" defaultValue={user.email} />
            </Field>
            <Field>
              <Label>Телефон</Label>
              <Input name="phoneNumber" defaultValue={user.phoneNumber} />
            </Field>
            <SeparationHeader>Учебная информация</SeparationHeader>
            <Field mb="14px">
              <Label>Группа</Label>
              <Input defaultValue={user.group} readOnly />
            </Field>
            <Field>
              <Label>Курс</Label>
              <Input defaultValue={user.course} readOnly />
            </Field>
            <SeparationHeader>Цветовая схема</SeparationHeader>
            <Field>
              <Label>Тема</Label>
              <Select value={theme} onChange={(event): void => changeTheme(event)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="night-blue">Night Blue</option>
              </Select>
            </Field>
            <SeparationHeader>Подписка на уведомления</SeparationHeader>
            <Field>
              {!isSubscribed ? (
                <SubscriptionButton type="button" onClick={subscribe} disabled={isLoading}>
                  {isLoading ? (
                    <Loader width="17px" theme={themeSelection(theme) || {}} />
                  ) : (
                    'Подписаться'
                  )}
                </SubscriptionButton>
              ) : (
                <SubscriptionButton type="button" onClick={unsubscribe} disabled={isLoading}>
                  {isLoading ? (
                    <Loader width="17px" theme={themeSelection(theme) || {}} />
                  ) : (
                    'Отписаться'
                  )}
                </SubscriptionButton>
              )}
            </Field>
          </UserDetails>
        </SettingsWindow>
      </Page>
    </ThemeProvider>
  );
};
