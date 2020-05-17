import React from 'react';

import styled, { keyframes } from 'styled-components';
import { Loader5 } from '@styled-icons/remix-fill/Loader5';

import { IStyledProps, IProps } from './interfaces';

const Spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const LoaderSvg = styled(Loader5)`
  width: ${(props: IStyledProps): string => props.width};
  fill: ${(props: IStyledProps): string => props.customTheme || props?.theme?.elementsColor};
  margin: ${(props: IStyledProps): string => props.indents};
  animation: ${Spin} 1s linear 0s infinite;
`;

export const Loader: React.FC<IProps> = ({ width, customTheme, indents }) => {
  return (
    <LoaderSvg width={width || '30px'} customTheme={customTheme || ''} indents={indents || ''} />
  );
};
