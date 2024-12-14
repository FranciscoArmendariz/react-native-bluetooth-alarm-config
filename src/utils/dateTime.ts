export const buildDateMessage = (date: Date) => {
  const year = date.getFullYear().toString().slice(-2).padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `DATE-${year}-${month}-${day}`;
};

export const buildTimeMessage = (date: Date) => {
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `TIME-${hour}-${minute}-${second}`;
};

export const buildAlarmMessage = (date: Date) => {
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `ALRM-${hour}-${minute}-${second}`;
};
