import React, { useState, forwardRef } from 'react';

import styled from 'styled-components';

import { Lesson } from '../Lesson/Lesson';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { ReactComponent as HideCurtainButtonIcon } from '../../assets/images/svg/hide-curtain-button-icon.svg';

const Curtain = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 0 16px;
  bottom: 0;
  border-top: 1px solid ${(props: ITheme): string => props.theme.elementBackground};
  border-radius: 10px 10px 0 0;
  z-index: 2;
  transform: translateY(${window.innerHeight}px);
  transition: 0.8s;
`;
const HideCurtainButton = styled(HideCurtainButtonIcon)`
  fill: ${(props: ITheme): string => props.theme.elementsColor};
  padding: 10px 0 24px 0;
  cursor: pointer;
`;

export const Schedule = forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const [initialPoint, setInitialPoint] = useState({ pageY: 0 });

  const { currentSchedule, hideSchedule } = props;

  const mouseDown = (event: React.MouseEvent): void => {
    setInitialPoint({ pageY: event.clientY });
  };

  const mouseUp = (event: React.MouseEvent): void => {
    const moveUp = event.clientY - initialPoint.pageY;

    if (moveUp >= 15) {
      hideSchedule();
    }
  };

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
      onMouseDown={(event): void => mouseDown(event)}
      onMouseUp={(event): void => mouseUp(event)}
      onTouchStart={(event): void => touchTapStart(event)}
      onTouchMove={(event): void => touchMove(event)}
      ref={ref}
    >
      <HideCurtainButton onClick={hideSchedule} />
      {currentSchedule &&
        currentSchedule.map((lessonData, index) => (
          <Lesson
            key={index}
            lesson={lessonData}
            isFirstLesson={index === 0}
            isLastLesson={index === currentSchedule.length - 1}
          />
        ))}
    </Curtain>
  );
});
