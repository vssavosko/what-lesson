import { themes } from '../assets/core/themes';

export const themeSelection = (theme: string): object => {
  switch (theme) {
    case 'light':
      return themes.light;
    case 'dark':
      return themes.dark;
    case 'night-blue':
      return themes.nightBlue;
    default:
      return {};
  }
};
