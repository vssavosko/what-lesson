import React, { useContext, useState, useRef } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ITheme, IMargin } from '../../globalInterfaces';
import { IProps, ICheckUserData } from './interfaces';

import { UserAvatarDefault } from '../UserAvatarDefault/UserAvatarDefault';
import { Loader } from '../Loader/Loader';

import { Context } from '../../containers/app/appContext';

import { themeSelection } from '../../utils/themeSelection';

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
const UserAvatar = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 16px;
  overflow: hidden;
  cursor: pointer;
`;
const UserAvatarCustom = styled.img`
  width: 100%;
`;
const UserAvatarChangeLabel = styled.div`
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
const UploadAvatar = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  visibility: hidden;
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

export const Settings: React.FC<IProps> = ({
  isSubscribed,
  userToken,
  userRegistrationData,
  user,
  theme,
}) => {
  const { dispatch } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  const refUploadAvatar = useRef<HTMLInputElement>(null);

  const clickUserAvatar = (): void => refUploadAvatar.current?.click();

  const changeUserAvatar = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    const { files } = event.target;

    if (files?.length) {
      const formData = new FormData();

      formData.append('user-avatar', files[0], user.key);

      fetch(`http://localhost:5000/upload_user_avatar`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.upload) {
            const payload = {
              key: user.key,
              name: 'userAvatar',
              value: res.path,
            };

            fetch(`http://localhost:5000/update_user_profile`, {
              method: 'POST',
              body: JSON.stringify(payload),
            }).then(() => {
              const payload = { ...user, userAvatar: `http://localhost:5000/${res.path}` };

              dispatch({ type: 'user', payload });
            });
          }
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => {
          event.target.value = '';
        });
    }
  };

  const changeUserData = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const [checkUserData] = [user].filter(
      (userData: ICheckUserData) => userData[target.name] === target.value,
    );

    if (event.key === 'Enter' && !checkUserData) {
      const payload = {
        key: user.key,
        name: target.name,
        value: target.value,
      };

      fetch(`http://localhost:5000/update_user_profile`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).then(() => {
        const payload = { ...user, [target.name]: target.value };

        dispatch({ type: 'user', payload });
      });
    }
  };

  const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch({ type: 'theme', payload: event.target.value });
  };

  const subscribe = (): void => {
    setIsLoading(true);

    fetch(`http://localhost:5000/subscribe`, {
      method: 'POST',
      body: JSON.stringify({
        userToken,
        userGroup: userRegistrationData.groupCode,
      }),
    })
      .then(() => {
        localStorage.setItem('isSubscribed', 'true');

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
        userGroup: userRegistrationData.groupCode,
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
            <UserAvatar onClick={clickUserAvatar}>
              {user.userAvatar.length ? (
                <UserAvatarCustom src={user.userAvatar} />
              ) : (
                <UserAvatarDefault theme={theme} />
              )}
              <UserAvatarChangeLabel>правка</UserAvatarChangeLabel>
              <UploadAvatar
                type="file"
                name="user-avatar"
                onChange={(event): void => changeUserAvatar(event)}
                ref={refUploadAvatar}
              />
            </UserAvatar>
            <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
            <UserContacts>e-mail: {user.email}</UserContacts>
            <UserContacts>телефон: {user.phoneNumber}</UserContacts>
          </UserInfoPreview>
          <UserDetails>
            <Field mb="14px">
              <Label>Имя</Label>
              <Input
                name="firstName"
                defaultValue={user.firstName}
                onKeyUp={(event): void => changeUserData(event)}
              />
            </Field>
            <Field mb="14px">
              <Label>Фамилия</Label>
              <Input
                name="lastName"
                defaultValue={user.lastName}
                onKeyUp={(event): void => changeUserData(event)}
              />
            </Field>
            <Field mb="14px">
              <Label>E-mail</Label>
              <Input
                name="email"
                defaultValue={user.email}
                onKeyUp={(event): void => changeUserData(event)}
              />
            </Field>
            <Field>
              <Label>Телефон</Label>
              <Input
                name="phoneNumber"
                defaultValue={user.phoneNumber}
                onKeyUp={(event): void => changeUserData(event)}
              />
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
