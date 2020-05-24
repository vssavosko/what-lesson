import React from 'react';

import styled from 'styled-components';
import { User } from '@styled-icons/feather/User';

import { ISizes, IPosition, ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${(props: ISizes): string | undefined => props.width};
  height: ${(props: ISizes): string | undefined => props.height};
  border: 2px solid ${(props: ITheme): string => props.theme.elementsColor};
  border-radius: 50%;
  overflow: hidden;
`;
const UserAvatar = styled(User)`
  position: absolute;
  top: ${(props: IPosition): string | undefined => props.top};
  stroke: ${(props: ITheme): string => props.theme.elementsColor};
  fill: ${(props: ITheme): string => props.theme.elementsColor};
`;

export const UserAvatarDefault: React.FC<IProps> = ({ width, height, top }) => {
  return (
    <Wrapper width={width || '56px'} height={height || '56px'}>
      <UserAvatar top={top || '8px'} />
    </Wrapper>
  );
};
