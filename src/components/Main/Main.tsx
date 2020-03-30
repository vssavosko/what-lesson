import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';
import Swiper from 'react-id-swiper';

import { Schedule } from '../Schedule/Schedule';

import { IStyledProps, IProps, ILesson } from './interfaces';

import { lessonsData } from '../../mockData';

import 'swiper/css/swiper.min.css';

import UserAvatar from '../../assets/images/user-avatar.png';
import { ReactComponent as UserIconDefault } from '../../assets/images/svg/user-icon.svg';
import { ReactComponent as DotsIcon } from '../../assets/images/svg/dots.svg';

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  padding-bottom: 16px;
  justify-content: center;
  align-items: flex-end;
`;
const Greeting = styled.div`
  width: 274px;
  height: 128px;
  margin: 0 auto;
`;
const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserIconCustom = styled.img`
  max-width: 100%;
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
const DateValue = styled.p`
  width: 274px;
  margin-bottom: 5px;
  font-family: SFProTextRegular, sans-serif;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;
const Tab = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 274px;
  height: 330px;
  background-color: #f9f9f9;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  transition: 0.4s;
`;
const IconsBar = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
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
const DotsButton = styled.div`
  width: 20px;
  height: 20px;
  padding-top: 7px;
  text-align: right;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  padding-bottom: ${(props: IStyledProps): string | undefined => props.pb};
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;
const PrincipalValue = styled.p<IStyledProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: ${(props: IStyledProps): string | undefined => props.pb};
  font-family: 'SFProTextSemibold', sans-serif;
  font-size: 18px;
`;

export const Main: React.FC<IProps> = ({ user }) => {
  const [swiper, setSwiper] = useState<any>({});
  const [initialPoint, setInitialPoint] = useState({ pageY: 0 });
  const [showSchedule, setShowSchedule] = useState(false);
  const [tapOnTab, setTapOnTab] = useState(false);

  const refSchedule = useRef<HTMLDivElement>(null);

  const dayOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  const weekdayNumber = (): number => {
    const date = new Date().getDay();

    if (date === 0) {
      return dayOfWeek.length - 1;
    }

    return date - 1;
  };

  const currentDate = (): string => {
    const date = new Date();
    const options = {
      day: 'numeric',
      weekday: 'long',
      month: 'long',
    };

    return date.toLocaleString('ru', options);
  };

  const touchTapStart = (event: React.TouchEvent): void => {
    setTapOnTab(true);
    setInitialPoint(event.changedTouches[0]);
  };

  const touchTapEnd = (): void => {
    setTapOnTab(false);
  };

  const touchMove = (event: React.TouchEvent): void => {
    const swipe = initialPoint.pageY - event.touches[0].pageY;

    if (swipe >= 30) {
      setShowSchedule(true);
    }
  };

  const clickOnDotsButton = (): void => setShowSchedule(true);

  const numberOfLessons = (lessons: object[]): number => lessons.length;

  const currentScheduleData = (): ILesson[] =>
    Object.keys(swiper).length ? lessonsData[swiper.activeIndex] : [];

  const hideSchedule = (): void => setShowSchedule(false);

  const swiperParams = {
    slidesPerView: 'auto',
    direction: 'horizontal',
    centeredSlides: true,
    centerInsufficientSlides: true,
    roundLengths: true,
    spaceBetween: 16,
    setWrapperSize: true,
    normalizeSlideIndex: true,
    initialSlide: weekdayNumber(),
    freeMode: false,
  };

  return (
    <Page>
      <Greeting>
        <UserIcon>
          {UserAvatar ? <UserIconCustom src={UserAvatar} /> : <UserIconDefault />}
        </UserIcon>
        <GreetingText>Привет, {user.firstName}</GreetingText>
      </Greeting>
      <Tabs>
        <DateValue>{currentDate()}</DateValue>
        <Swiper {...swiperParams} getSwiper={setSwiper}>
          {dayOfWeek.map((day, index) => {
            return (
              <CSSTransition key={index} in={tapOnTab} timeout={0} classNames='tab'>
                <Tab
                  onTouchStart={(event): void => touchTapStart(event)}
                  onTouchEnd={(): void => touchTapEnd()}
                  onTouchMove={(event): void => touchMove(event)}
                >
                  <IconsBar>
                    <Circle>
                      <CircleText>{day}</CircleText>
                    </Circle>
                    {lessonsData[index] && (
                      <DotsButton onClick={(): void => clickOnDotsButton()}>
                        <DotsIcon />
                      </DotsButton>
                    )}
                  </IconsBar>
                  <TabContent>
                    {lessonsData[index] && (
                      <SideValues pb='5px'>
                        {`${numberOfLessons(lessonsData[index])} ${
                          numberOfLessons(lessonsData[index]) > 1 ? 'пары' : 'пара'
                        }`}
                      </SideValues>
                    )}
                    {lessonsData[index] &&
                      lessonsData[index].map((lesson, index) =>
                        index < 2 ? (
                          <PrincipalValue key={index} pb='5px'>
                            {lesson.lessonName}
                          </PrincipalValue>
                        ) : (
                          false
                        )
                      )}
                    {!lessonsData[index] && (
                      <PrincipalValue key={index} pb='5px'>
                        Занятий нет
                      </PrincipalValue>
                    )}
                    {lessonsData[index] && lessonsData[index].length > 2 && (
                      <SideValues>И другие</SideValues>
                    )}
                  </TabContent>
                </Tab>
              </CSSTransition>
            );
          })}
        </Swiper>
      </Tabs>
      <CSSTransition
        in={currentScheduleData() ? showSchedule : false}
        timeout={0}
        classNames='schedule'
      >
        <Schedule
          currentSchedule={currentScheduleData()}
          hideSchedule={hideSchedule}
          ref={refSchedule}
        />
      </CSSTransition>
    </Page>
  );
};
