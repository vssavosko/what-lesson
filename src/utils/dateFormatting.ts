export const dateFormatting = (sendingDate: string, currentDate: string): string => {
  const convertedSendingDate = new Date(sendingDate);
  const convertedCurrentDate = new Date(currentDate);

  if (convertedSendingDate.getTime() === convertedCurrentDate.getTime() - 86400 * 1000) {
    return 'вчера';
  }
  if (convertedSendingDate.getTime() === convertedCurrentDate.getTime()) return 'сегодня';

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return convertedSendingDate.toLocaleString('ru', options);
};
