import React, { useRef } from 'react';

import styled from 'styled-components';

import { IStyledProps, IProps } from './interfaces';

import UserAvatar from '../../assets/images/user-avatar.png';
import { ReactComponent as UserIconDefault } from '../../assets/images/svg/user-icon.svg';

const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
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
  text-align: center;
  margin-bottom: 5px;
`;
const UserContacts = styled.p`
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  text-align: center;
  margin-bottom: 3px;
`;
const UserDetails = styled.div`
  width: 100%;
  padding-top: 16px;
`;
const Field = styled.div<IStyledProps>`
  padding: 0 16px;
  margin-bottom: ${(props: IStyledProps): string | undefined => props.mb};
`;
const Label = styled.div`
  padding: 0 0 3px 7px;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  background-color: #f9f9f9;
  padding: 5px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
`;
const SeparationHeader = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  padding-left: 22px;
  margin: 14px 0;
  text-transform: uppercase;
`;
const Select = styled.select`
  box-sizing: border-box;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  background-color: #f9f9f9;
  padding: 5px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
`;

export const Settings: React.FC<IProps> = ({ user }) => {
  const refUploadIcon = useRef<HTMLInputElement>(null);

  const changeUserIcon = (): void => refUploadIcon.current?.click();

  return (
    <Page>
      <SettingsWindow>
        <UserInfoPreview>
          <UserIcon onClick={changeUserIcon}>
            {UserAvatar ? <UserIconCustom src={UserAvatar} /> : <UserIconDefault />}
            <UserIconChangeLabel>правка</UserIconChangeLabel>
            <UploadIcon type='file' ref={refUploadIcon} />
          </UserIcon>
          <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
          <UserContacts>e-mail: {user.email}</UserContacts>
          <UserContacts>телефон: {user.phoneNumber}</UserContacts>
        </UserInfoPreview>
        <UserDetails>
          <Field mb='14px'>
            <Label>Имя</Label>
            <Input defaultValue={user.firstName} />
          </Field>
          <Field mb='14px'>
            <Label>Фамилия</Label>
            <Input defaultValue={user.lastName} />
          </Field>
          <Field mb='14px'>
            <Label>E-mail</Label>
            <Input defaultValue={user.email} />
          </Field>
          <Field>
            <Label>Телефон</Label>
            <Input defaultValue={user.phoneNumber} />
          </Field>
          <SeparationHeader>Учебная информация</SeparationHeader>
          <Field mb='14px'>
            <Label>Группа</Label>
            <Input defaultValue={user.group} />
          </Field>
          <Field>
            <Label>Курс</Label>
            <Input defaultValue={user.course} />
          </Field>
          <SeparationHeader>Цветовая схема</SeparationHeader>
          <Field>
            <Label>Тема</Label>
            <Select>
              <option>Light</option>
              <option>Dark</option>
              <option>Night Blue</option>
            </Select>
          </Field>
        </UserDetails>
      </SettingsWindow>
    </Page>
  );
};
