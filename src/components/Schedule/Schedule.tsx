import React, { useState } from 'react';

import styled from 'styled-components';

import { IProps, IStyledProps } from './interfaces';

import { ReactComponent as HideCurtainButtonIcon } from '../../assets/images/svg/hide-curtain-button-icon.svg';

const Curtain = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: #f9f9f9;
  padding: 0 16px;
  bottom: 0;
  border-top: 1px solid #f3f3f3;
  border-radius: 30px 30px 0 0;
  z-index: 2;
  transform: translateY(${window.innerHeight}px);
  transition: 0.8s;
`;
const Lesson = styled.div<IStyledProps>`
  position: relative;
  width: 100%;
  height: ${(props: IStyledProps): string => (props.height ? props.height : '')};
  padding: 0 16px;
`;
const Line = styled.div<IStyledProps>`
  position: absolute;
  width: 5px;
  height: ${(props: IStyledProps): string => (props.height ? props.height : '')};
  top: ${(props: IStyledProps): string => (props.top ? props.top : '')};
  left: 22px;
  background: #000;
`;
const Circle = styled.div`
  position: absolute;
  width: 17px;
  height: 17px;
  top: 26px;
  background: #000;
  border-radius: 50%;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
`;
const LessonInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding-left: 32px;
`;
const SideValues = styled.p`
  width: 100%;
  font-family: SFProTextRegular, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;
const PrincipalValue = styled.p`
  width: 100%;
  font-family: SFProDisplaySemibold, sans-serif;
  font-size: 15px;
`;
const TeacherInfo = styled.div`
  display: flex;
  width: 100%;
  text-align: right;
  align-items: center;
`;

const Paddings = styled.div<IStyledProps>`
  padding: ${(props: IStyledProps): string => (props.padding ? props.padding : '')};
`;

export const Schedule = React.forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [initialPoint, setInitialPoint] = useState({ pageY: 0 });

  const { currentSchedule, hideSchedule } = props;

  const touchTapStart = (event: React.TouchEvent): void => {
    setInitialPoint(event.changedTouches[0]);
  };

  const touchMove = (event: React.TouchEvent): void => {
    const slideUp = event.touches[0].pageY - initialPoint.pageY;

    if (slideUp >= 30) {
      hideSchedule();
    }
  };

  return (
    <Curtain
      onTouchStart={(event): void => touchTapStart(event)}
      onTouchMove={(event): void => touchMove(event)}
      ref={ref}
    >
      <Paddings padding='10px 0 24px 0'>
        <HideCurtainButtonIcon />
      </Paddings>
      {currentSchedule
        && currentSchedule.map((lessonData, index) => {
          return (
            <Lesson key={index} height={index === currentSchedule.length - 1 ? '126px' : '100px'}>
              <Circle />
              <Line
                top={index ? '0' : '33px'}
                height={index || currentSchedule.length === 1 ? '100%' : '67px'}
              />
              <Content>
                <LessonInfo>
                  <SideValues>{lessonData.time}</SideValues>
                  <PrincipalValue>{lessonData.lessonName}</PrincipalValue>
                  <SideValues>{lessonData.place}</SideValues>
                </LessonInfo>
                <TeacherInfo>
                  <PrincipalValue>{lessonData.teacherName}</PrincipalValue>
                </TeacherInfo>
              </Content>
            </Lesson>
          );
        })}
    </Curtain>
  );
});
