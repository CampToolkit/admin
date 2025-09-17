import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";

import type { EntityKeys } from "@/modules/schedule/hooks/filter-union-sessions/EntityKeys.type.ts";

export function unionSessions<K extends EntityKeys<Lesson>>(
  list: Lesson[],
  key: K,
): Record<string, Lesson[]> {
  // note попробовать поменять string на number
  const grouped: Record<string, Lesson[]> = {};

  for (const item of list) {
    const value = item[key];

    if (Array.isArray(value)) {
      for (const sub of value) {
        (grouped[sub.id] ??= []).push(item);
      }
    } else {
      (grouped[value.id] ??= []).push(item);
    }
  }
  return grouped;
}
