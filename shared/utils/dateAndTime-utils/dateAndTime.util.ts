import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const timeFromNow = (date: string) => {
  dayjs.extend(relativeTime);
  return dayjs().to(dayjs(date));
};
