import { themeSelection } from './themeSelection';

export const changingStatusBarColor = (theme: string): void => {
  const currentTheme = themeSelection(theme) as { elementBackground: string };

  document.body.style.backgroundColor = `${
    theme === 'light' ? '#000' : currentTheme.elementBackground
  }`;
};
