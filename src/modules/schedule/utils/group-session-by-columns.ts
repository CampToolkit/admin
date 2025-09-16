import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

type EntityKeys<T> = {
  [K in keyof T]: T[K] extends Entity | Entity[] ? K : never;
}[keyof T];

export function groupSessionByColumns<K extends EntityKeys<Lesson>>(
  list: Lesson[],
  key: K,
): Record<string, Lesson[]> {
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
