import React, { useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { ISizes, ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { themeSelection } from '../../utils/themeSelection';

import { ReactComponent as HideCurtainButtonIcon } from '../../assets/images/svg/hide-curtain-button-icon.svg';

const Curtain = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 0 16px;
  bottom: 0;
  border-top: 1px solid ${(props: ITheme): string => props.theme.elementBackground};
  border-radius: 30px 30px 0 0;
  z-index: 2;
  transform: translateY(${window.innerHeight}px);
  transition: 0.8s;
`;
const HideCurtainButton = styled.div`
  fill: ${(props: ITheme): string => props.theme.elementsColor};
  padding: 10px 0 24px 0;
`;
const Lesson = styled.div`
  position: relative;
  width: 100%;
  height: ${(props: ISizes): string | undefined => props.height};
  padding: 0 16px;
`;
const Line = styled.div<{ top: string; height: string }>`
  position: absolute;
  width: 5px;
  top: ${(props): string | undefined => props.top};
  height: ${(props): string | undefined => props.height};
  left: 22px;
  background: ${(props: ITheme): string => props.theme.elementsColor};
`;
const Circle = styled.div`
  position: absolute;
  width: 17px;
  height: 17px;
  top: 26px;
  background: ${(props: ITheme): string => props.theme.elementsColor};
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
  color: ${(props: ITheme): string => props.theme.secondTextColor};
`;
const PrincipalValue = styled.p`
  width: 100%;
  font-family: SFProDisplaySemibold, sans-serif;
  font-size: 15px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
`;
const TeacherInfo = styled.div`
  display: flex;
  width: 100%;
  text-align: right;
  align-items: center;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
`;

export const Schedule = React.forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [initialPoint, setInitialPoint] = useState({ pageY: 0 });

  const { currentSchedule, hideSchedule, theme } = props;

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
    <ThemeProvider theme={themeSelection(theme)}>
      <Curtain
        onTouchStart={(event): void => touchTapStart(event)}
        onTouchMove={(event): void => touchMove(event)}
        ref={ref}
      >
        <HideCurtainButton>
          <HideCurtainButtonIcon />
        </HideCurtainButton>
        {currentSchedule &&
          currentSchedule.map((lessonData, index) => {
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
    </ThemeProvider>
  );
});
