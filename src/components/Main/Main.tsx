import React from 'react';

import styled from 'styled-components';

import { IStyledProps } from './interfaces';

import { ReactComponent as UserIcon } from '../../assets/images/svg/user-icon.svg';
import { ReactComponent as DotsIcon } from '../../assets/images/svg/dots.svg';

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 0 16px;
  padding-bottom: 16px;
  justify-content: center;
  align-items: flex-end;
`;
const Greeting = styled.div`
  width: 274px;
  height: 128px;
  margin: 0 auto;
`;
const GreetingText = styled.p`
  margin-top: 34px;
  font-family: SFProTextSemibold, sans-serif;
  font-size: 25px;
  color: #000;
`;
const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 355px;
  justify-content: center;
  align-items: flex-end;
`;
const Date = styled.p`
  width: 274px;
  margin-bottom: 5px;
  font-family: SFProTextRegular, sans-serif;
  font-size: 15px;
  color: rgba(0,0,0,0.5);
`;
const Tab = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 274px;
  height: 330px;
  background-color: #F9F9F9;
  border: 1px solid #F3F3F3;
  border-radius: 10px;
`;
const IconsBar = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  padding-top: 16px;
  justify-content: space-between;
`;
const Circle = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;
const CircleText = styled.p`
  font-family: SFProDisplayRegular, sans-serif;
  font-size: 15px;
`;
const DotsIconPadding = styled.div`
  padding-top: 7px;
`;
const TabContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 93px;
  padding: 16px;
  align-self: flex-end;
`;
const SideValues = styled.p<IStyledProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: ${(props: IStyledProps) => props.pb};
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 15px;
  color: rgba(0,0,0,0.5);
`;
const PrincipalValue = styled.p<IStyledProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: ${(props: IStyledProps) => props.pb};
  font-family: 'SFProTextSemibold', sans-serif;
  font-size: 18px;
`;

export const Main: React.FC = () => {
  return (
    <Page>
      <Greeting>
        <UserIcon />
        <GreetingText>Привет, Владислав</GreetingText>
      </Greeting>
      <Tabs>
        <Date>Воскресенье, 24 ноября</Date>
        <Tab>
          <IconsBar>
            <Circle>
              <CircleText>ВТ</CircleText>
            </Circle>
            <DotsIconPadding>
              <DotsIcon />
            </DotsIconPadding>
          </IconsBar>
          <TabContent>
            <SideValues pb='5px'>4 пары</SideValues>
            <PrincipalValue pb='5px'>ТВиМС</PrincipalValue>
            <PrincipalValue pb='5px'>Программирование</PrincipalValue>
            <SideValues>И другие</SideValues>
          </TabContent>
        </Tab>
      </Tabs>
    </Page>
  );
};
