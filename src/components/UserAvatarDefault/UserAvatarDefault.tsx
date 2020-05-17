import React from 'react';

import styled from 'styled-components';
import { User } from '@styled-icons/feather/User';

import { ITheme } from '../../globalInterfaces';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: 2px solid ${(props: ITheme): string => props.theme.elementsColor};
  border-radius: 50%;
`;
const UserAvatar = styled(User)`
  position: absolute;
  top: 8px;
  stroke: ${(props: ITheme): string => props.theme.elementsColor};
  fill: ${(props: ITheme): string => props.theme.elementsColor};
`;

export const UserAvatarDefault: React.FC = () => {
  return (
    <Wrapper>
      <UserAvatar />
    </Wrapper>
  );
};
