import dayjs, { type Dayjs } from "dayjs";
import type { Event } from "@/shared/api/event/EventApi.type.ts";
import {
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
  START_HOUR,
} from "../constants/time-table.const";

export function calcLessonPosition(lesson: Event) {
  const startDateD = dayjs(lesson.startDate);
  const endDateD = dayjs(lesson.endDate);

  const top = calcTopPosition(startDateD);

  const height =
    (endDateD.hour() - startDateD.hour()) * SLOTS_AMOUNT_IN_HOUR * SLOT_HEIGHT;
  return {
    top: top,
    height: height,
  };
}

function calcTopPosition(time: Dayjs) {
  return (time.hour() - START_HOUR) * SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR;
}
