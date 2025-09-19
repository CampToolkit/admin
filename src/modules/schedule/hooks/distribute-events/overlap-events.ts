import dayjs from "dayjs";
import type { Event } from "@/shared/api/event/EventApi.type.ts";

export type DistributedEvent = Record<string, Event[][]>;
export function overlapEvents(data: Record<string, Event[]>) {
  const newData: DistributedEvent = {};

  for (const [key, value] of Object.entries(data)) {
    newData[key] = [];

    const sorted = value.toSorted((a, b) =>
      dayjs(a.startDate).diff(dayjs(b.startDate)),
    );

    let currentGroup: Event[] = [];

    for (const event of sorted) {
      if (currentGroup.length === 0) {
        currentGroup.push(event);
        continue;
      }

      const lastEvent = currentGroup[currentGroup.length - 1];
      if (event.startDate < lastEvent.endDate) {
        currentGroup.push(event);
      } else {
        newData[key].push(currentGroup);
        currentGroup = [event];
      }
    }

    if (currentGroup.length > 0) {
      newData[key].push(currentGroup);
    }
  }

  return newData;
}
