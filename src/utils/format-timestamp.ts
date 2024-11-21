import { format } from 'date-fns';
export const formatTimestampToDate = (unixTimestamp: number) => {
  return format(new Date(unixTimestamp * 1000), 'dd/MM/yyyy');
};
