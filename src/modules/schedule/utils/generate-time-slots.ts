import { Dayjs, type ManipulateType } from "dayjs";

interface TimSlotParams {
  date: Dayjs;
  startHour: number;
  endHour: number;
  endMinute?: number;
  step: {
    value: number;
    unit: ManipulateType;
  };
}

export function generateTimeSlots({
  date,
  startHour,
  endHour,
  endMinute = 0,
  step,
}: TimSlotParams) {
  const slots: Dayjs[] = [];
  const end = date
    .clone()
    .set("hour", endHour)
    .set("minute", endMinute)
    .set("second", 0);
  let current = date
    .clone()
    .set("hour", startHour)
    .set("minute", 0)
    .set("second", 0);

  while (current.isBefore(end) || current.isSame(end)) {
    slots.push(current);
    current = current.add(step.value, step.unit);
  }
  return slots;
}
