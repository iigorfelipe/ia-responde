import { format, differenceInCalendarDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export const formatTimestampToDate = (unixTimestamp: number) => {
  return format(new Date(unixTimestamp * 1000), 'dd/MM/yyyy');
};

export const formatTimestampToRelativeDate = (timestamp: number): string => {
  const now = new Date();
  const date = timestamp ? new Date(timestamp * 1000) : now;
  const diffInDays = differenceInCalendarDays(now, date);

  if (diffInDays === 0) {
    return 'Hoje';
  }

  if (diffInDays === 1) {
    return 'Ontem';
  }

  if (diffInDays <= 7) {
    return `${diffInDays} dias atrás`;
  }

  return format(date, 'dd/MM/yyyy', { locale: ptBR });
};
