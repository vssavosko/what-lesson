import React from 'react';

import styled from 'styled-components';

import { ISizes, ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { nameFormatting } from '../../utils/nameFormatting';

const LessonBlock = styled.div`
  position: relative;
  width: 100%;
  height: ${(props: ISizes): string | undefined => props.height};
`;
const Line = styled.div<{ top: string; height: string }>`
  position: absolute;
  width: 5px;
  top: ${(props): string | undefined => props.top};
  height: ${(props): string | undefined => props.height};
  left: 6px;
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
  user-select: none;
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

export const Lesson: React.FC<IProps> = ({ lesson, isFirstLesson, isLastLesson }) => {
  return (
    <LessonBlock height={isLastLesson ? '126px' : '100px'}>
      <Circle />
      <Line
        top={isFirstLesson ? '33px' : '0'}
        height={!isFirstLesson || isLastLesson ? '100%' : '67px'}
      />
      <Content>
        <LessonInfo>
          <SideValues>{lesson.time}</SideValues>
          <PrincipalValue>{nameFormatting(lesson.lessonName, 17)}</PrincipalValue>
          <SideValues>{nameFormatting(lesson.place, 17)}</SideValues>
        </LessonInfo>
        <TeacherInfo>
          <PrincipalValue>{nameFormatting(lesson.teacherName, 14)}</PrincipalValue>
        </TeacherInfo>
      </Content>
    </LessonBlock>
  );
};
