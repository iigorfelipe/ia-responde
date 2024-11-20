export const formatTimestampToDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
