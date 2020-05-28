export const inputMaskPhone = (value: string): string => {
  if (value.length === 2) {
    value += ' (';
  }

  if (value.length === 7) {
    value += ') ';
  }

  if (value.length === 12 || value.length === 15) {
    value += '-';
  }

  return value;
};
