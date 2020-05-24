export const getSendingTime = (): string => {
  const currentDate = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return currentDate.toLocaleString('ru', options);
};
