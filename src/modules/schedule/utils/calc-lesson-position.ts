import dayjs, { type Dayjs } from "dayjs";
import type { Event } from "@/common/api/event/EventApi.type.ts";
import {
  MINUTES_IN_SLOT,
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
  START_HOUR,
} from "../constants/time-table.const";

interface Props {
  event: Event;
  eventIndex: number;
  overlapEventsAmount: number;
}

export function calcLessonPosition(props: Props) {
  const { event, eventIndex, overlapEventsAmount } = props;

  const startDateD = dayjs(event.startDate);
  const endDateD = dayjs(event.endDate);

  const height =
    (endDateD.hour() - startDateD.hour()) * SLOTS_AMOUNT_IN_HOUR * SLOT_HEIGHT;

  const width = 95 / overlapEventsAmount;

  const top = calcTopPosition(startDateD);

  const left = width * eventIndex;

  return {
    top,
    left,
    width,
    height,
  };
}

function calcTopPosition(time: Dayjs) {
  return (
    (time.hour() - START_HOUR) * SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR +
    (time.minute() * SLOT_HEIGHT) / MINUTES_IN_SLOT
  );
}
