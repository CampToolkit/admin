import dayjs, { type Dayjs } from "dayjs";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import {
  MINUTES_IN_SLOT,
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
  START_HOUR,
} from "../constants/time-table.const";

export function calcLessonPosition(lesson: Lesson) {
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
  return (
    (time.hour() - START_HOUR) * SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR +
    (time.minute() * SLOT_HEIGHT) / MINUTES_IN_SLOT
  );
}
