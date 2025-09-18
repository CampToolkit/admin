import type { Event } from "@/shared/api/event/EventApi.type.ts";
import { useEffect, useState } from "react";
import { unionSessions } from "@/modules/schedule/hooks/filter-union-sessions/union-sessions.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/filter-union-sessions/EntityKeys.type.ts";
import { filterSessions } from "@/modules/schedule/hooks/filter-union-sessions/filterSessions.ts";

interface Params<K> {
  list: Event[];
  unionKey: K;

  filter: { key: K; value: number };
}

export function useFilterAndUnionSessions<K extends EntityKeys<Event>>(
  params: Params<K>,
) {
  const { list, unionKey, filter } = params;
  const [state, setState] = useState<Record<string, Event[]>>({});

  useEffect(() => {
    const filtered = filterSessions(list, filter);
    const grouped = unionSessions(filtered, unionKey);
    setState(grouped);
  }, [list, unionKey, filter.key, filter.value]);

  return state;
}
