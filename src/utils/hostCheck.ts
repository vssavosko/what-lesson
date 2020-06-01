import { HostType } from '../globalTypes';

export const host = (): HostType => {
  const { hostname } = window.location;
  const devHost = {
    name: 'http://localhost:5000',
    api: 'http://localhost:5000',
  };
  const prodHost = {
    name: 'https://wl.vssavosko.tech',
    api: 'https://api.vssavosko.tech',
  };

  return hostname === 'localhost' ? devHost : prodHost;
};
