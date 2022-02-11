export const getDateData = (timestamp: number) => {
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = addZero(time.getMonth() + 1);
  const date = addZero(time.getDate());
  const hours = addZero(time.getHours());
  const minute = addZero(time.getMinutes());
  const seconds = addZero(time.getSeconds());
  return `${year}-${month}-${date} ${hours}:${minute}:${seconds}`;
};

const addZero = (number: number) => {
  return number < 10 ? '0' + number : number;
};
