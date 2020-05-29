export const checkingFingerprint = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )fingerprint=([^;]+)'));

  return match ? decodeURIComponent(match[2]) : null;
};
