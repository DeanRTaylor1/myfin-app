export default function getDatesInRange(start: Date, end: Date) {
  const date = new Date(start.getTime());

  date.setDate(date.getDate() + 1);

  const dates: Date[] = [];

  while (date < end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
