import { type Dayjs } from "dayjs";

export function isSameDay(itemDate: Dayjs, currentDate: Dayjs) {
  return itemDate.isSame(currentDate, "day");
}
