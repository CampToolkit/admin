import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import { useEffect, useState } from "react";
import { unionSessions } from "@/modules/schedule/hooks/distribute-events/union-sessions.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";
import { filterSessions } from "@/modules/schedule/hooks/distribute-events/filter-sessions.ts";
import { overlapEvents } from "@/modules/schedule/hooks/distribute-events/overlap-events.ts";

interface Params<K> {
  list: Lesson[];
  unionKey: K;
  filter: { key: K; value: number };
}

export function useDistributeEvents<K extends EntityKeys<Lesson>>(
  params: Params<K>,
) {
  const { list, unionKey, filter } = params;
  const [state, setState] = useState<Record<string, Lesson[][]>>({});

  useEffect(() => {
    const filtered = filterSessions(list, filter);
    const grouped = unionSessions(filtered, unionKey);
    const overlapped = overlapEvents(grouped);
    setState(overlapped);
  }, [list, unionKey, filter.key, filter.value]);

  return state;
}
