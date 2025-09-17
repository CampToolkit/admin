import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import dayjs from "dayjs";

export function overlapEvents(data: Record<string, Lesson[]>) {
  const newData: Record<string, Lesson[][]> = {};

  for (const [key, value] of Object.entries(data)) {
    newData[key] = [];

    const sorted = value.toSorted((a, b) =>
      dayjs(a.startDate).diff(dayjs(b.startDate)),
    );

    let currentGroup: Lesson[] = [];

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
