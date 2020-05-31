export const host = (): string => {
  const { hostname } = window.location;

  return hostname === 'localhost' ? 'http://localhost:5000' : 'https://vssavosko.tech';
};
