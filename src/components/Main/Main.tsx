import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';
import Swiper from 'react-id-swiper';

import { UserAvatarDefault } from '../UserAvatarDefault/UserAvatarDefault';
import { Schedule } from '../Schedule/Schedule';

import { ScheduleType } from '../../globalTypes';
import { ITheme, IPadding } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { nameFormatting } from '../../utils/nameFormatting';

import 'swiper/css/swiper.min.css';

import { ReactComponent as DotsIcon } from '../../assets/images/svg/dots-icon.svg';

const Page = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${(props: ITheme): string => props.theme.background};
  padding-bottom: 16px;
`;
const Greeting = styled.div`
  width: 274px;
  padding: 16px 0;
  margin: auto;

  @media (max-width: 321px) {
    width: 220px;
  }
`;
const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserAvatarCustom = styled.img`
  width: 100%;
`;
const GreetingText = styled.p`
  margin-top: 34px;
  font-family: SFProTextSemibold, sans-serif;
  font-size: 25px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};

  @media (max-width: 321px) {
    margin-top: 28px;
  }
`;
const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 355px;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 321px) {
    height: 274px;
  }
`;
const DateValue = styled.p`
  width: 274px;
  margin-bottom: 5px;
  font-family: SFProTextRegular, sans-serif;
  font-size: 15px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};

  @media (max-width: 321px) {
    width: 220px;
  }
`;
const Tab = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 274px;
  height: 330px;
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  transition: 0.4s;

  @media (max-width: 321px) {
    width: 220px;
    height: 250px;
  }
`;
const IconsBar = styled.div`
  position: relative;
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
  border: 1px solid ${(props: ITheme): string => props.theme.elementsColor};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;
const CircleText = styled.p`
  font-family: SFProDisplayRegular, sans-serif;
  font-size: 15px;
  color: ${(props: ITheme): string => props.theme.elementsColor};
`;
const DotsButton = styled.div`
  position: absolute;
  width: 37px;
  height: 20px;
  right: 0;
  fill: ${(props: ITheme): string => props.theme.elementsColor};
  text-align: center;
  padding-top: 7px;
  cursor: pointer;
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
const SideValues = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 15px;
  padding-bottom: ${(props: IPadding): string | undefined => props.pb};
  color: ${(props: ITheme): string => props.theme.secondTextColor};
`;
const PrincipalValue = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: 'SFProTextSemibold', sans-serif;
  font-size: 18px;
  padding-bottom: ${(props: IPadding): string | undefined => props.pb};
  color: ${(props: ITheme): string => props.theme.mainTextColor};
`;

export const Main: React.FC<IProps> = ({ user, schedule }) => {
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

  const mouseDown = (event: React.MouseEvent): void => {
    setTapOnTab(true);
    setInitialPoint({ pageY: event.clientY });
  };

  const mouseUp = (event: React.MouseEvent): void => {
    const move = initialPoint.pageY - event.clientY;

    setTapOnTab(false);

    if (move >= 15) {
      setShowSchedule(true);
    }
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

  const currentScheduleData = (): ScheduleType[] =>
    Object.keys(swiper).length ? schedule[swiper.activeIndex] : [];

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
        <UserAvatar>
          {user.userAvatar.length ? (
            <UserAvatarCustom src={user.userAvatar} />
          ) : (
            <UserAvatarDefault />
          )}
        </UserAvatar>
        <GreetingText>Привет, {user.firstName}</GreetingText>
      </Greeting>
      <Tabs>
        <DateValue>{currentDate()}</DateValue>
        <Swiper {...swiperParams} getSwiper={setSwiper}>
          {dayOfWeek.map((day, index) => {
            return (
              <CSSTransition key={index} in={tapOnTab} timeout={0} classNames="tab">
                <Tab
                  onMouseDown={(event): void => mouseDown(event)}
                  onMouseUp={(event): void => mouseUp(event)}
                  onTouchStart={(event): void => touchTapStart(event)}
                  onTouchEnd={(): void => touchTapEnd()}
                  onTouchMove={(event): void => touchMove(event)}
                >
                  <IconsBar>
                    <Circle>
                      <CircleText>{day}</CircleText>
                    </Circle>
                    {schedule[index] && (
                      <DotsButton onClick={(): void => clickOnDotsButton()}>
                        <DotsIcon />
                      </DotsButton>
                    )}
                  </IconsBar>
                  <TabContent>
                    {schedule[index] && (
                      <SideValues pb="5px">
                        {`${numberOfLessons(schedule[index])} ${
                          numberOfLessons(schedule[index]) > 1 ? 'пары' : 'пара'
                        }`}
                      </SideValues>
                    )}
                    {schedule[index] &&
                      schedule[index].map((lesson, index) =>
                        index < 2 ? (
                          <PrincipalValue key={index} pb="5px">
                            {nameFormatting(lesson.lessonName, 19)}
                          </PrincipalValue>
                        ) : (
                          false
                        ),
                      )}
                    {!schedule[index] && (
                      <PrincipalValue key={index} pb="5px">
                        Занятий нет
                      </PrincipalValue>
                    )}
                    {schedule[index] && schedule[index].length > 2 && (
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
        classNames="schedule"
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
