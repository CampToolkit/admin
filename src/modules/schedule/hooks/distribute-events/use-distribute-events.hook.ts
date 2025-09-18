import { useEffect, useState } from "react";
import { unionSessions } from "@/modules/schedule/hooks/distribute-events/union-sessions.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";
import { filterSessions } from "@/modules/schedule/hooks/distribute-events/filter-sessions.ts";
import { overlapEvents } from "@/modules/schedule/hooks/distribute-events/overlap-events.ts";
import type { Event } from "@/shared/api/event/EventApi.type.ts";

interface Params<K> {
  list: Event[];
  unionKey: K;
  filter: { key: K; value: number };
}

export function useDistributeEvents<K extends EntityKeys<Event>>(
  params: Params<K>,
) {
  const { list, unionKey, filter } = params;
  const [state, setState] = useState<Record<string, Event[][]>>({});

  useEffect(() => {
    const filtered = filterSessions(list, filter);
    const grouped = unionSessions(filtered, unionKey);
    const overlapped = overlapEvents(grouped);
    setState(overlapped);
  }, [list, unionKey, filter.key, filter.value]);

  return state;
}
