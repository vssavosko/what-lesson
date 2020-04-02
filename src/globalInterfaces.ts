import { ThemesType } from './globalTypes';

export interface ISizes {
  width?: string;
  height?: string;
}

export interface IPosition {
  right?: string;
  top?: string;
  left?: string;
  bottom?: string;
}

export interface IPadding {
  padding?: string;
  pr?: string;
  pt?: string;
  pl?: string;
  pb?: string;
}

export interface IMargin {
  margin?: string;
  mr?: string;
  mt?: string;
  ml?: string;
  mb?: string;
}

export interface ITheme {
  theme: ThemesType;
}
