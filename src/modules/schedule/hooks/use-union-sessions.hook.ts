import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import { useEffect, useState } from "react";
import { unionSessionByColumns } from "@/modules/schedule/utils/union-session-by-columns.ts";

type EntityKeys<T> = {
  [K in keyof T]: T[K] extends Entity | Entity[] ? K : never;
}[keyof T];

export function useUnionSessions<K extends EntityKeys<Lesson>>(
  list: Lesson[],
  key: K,
) {
  const [state, setState] = useState<Record<string, Lesson[]>>({});

  useEffect(() => {
    const grouped = unionSessionByColumns(list, key);
    setState(grouped);
  }, [list, key]);

  return state;
}
