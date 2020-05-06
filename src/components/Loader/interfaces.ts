import { ThemesType } from '../../globalTypes';

export interface IStyledProps {
  width: string;
  theme: ThemesType;
  customTheme: string;
  indents: string;
}

export interface IProps {
  width?: string;
  theme?: ThemesType | object;
  customTheme?: string;
  indents?: string;
}
