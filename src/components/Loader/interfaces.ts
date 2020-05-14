import { ThemeType } from '../../globalTypes';

export interface IStyledProps {
  width: string;
  theme: ThemeType;
  customTheme: string;
  indents: string;
}

export interface IProps {
  width?: string;
  theme?: ThemeType | object;
  customTheme?: string;
  indents?: string;
}
