import { useEffect, useState } from "react";
import {
  type AccumulateEvent,
  groupByEntityKey,
} from "@/modules/schedule/hooks/distribute-events/group-by-entity-key.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";
import { matchEntity } from "@/modules/schedule/hooks/distribute-events/filter-by-entity.ts";
import {
  type DistributedEvent,
  overlapEvents,
} from "@/modules/schedule/hooks/distribute-events/overlap-events.ts";
import type { Event } from "@/shared/api/event/EventApi.type.ts";
import dayjs, { type Dayjs } from "dayjs";
import { isSameDay } from "@/modules/schedule/hooks/distribute-events/filter-by-date.ts";

export type EntitiesKeyType = keyof Pick<Event, "auditorium" | "groups">;

interface Params<K> {
  list: Event[];
  unionKey: K;
  currentDate: Dayjs;
  filter: { key: K; value: number };
}

export function useDistributeEvents<K extends EntityKeys<Event>>(
  params: Params<K>,
) {
  const { list, unionKey, currentDate, filter } = params;
  const [state, setState] = useState<DistributedEvent>({});

  useEffect(() => {
    const acc: AccumulateEvent = {};
    const grouped = list
      .filter((item) => matchEntity(item, filter))
      .filter((item) => isSameDay(dayjs(item.startDate), currentDate))
      .reduce((acc, item) => groupByEntityKey(acc, item, unionKey), acc);

    const overlapped = overlapEvents(grouped);
    setState(overlapped);
  }, [list, unionKey, filter.key, filter.value, currentDate]);

  return state;
}
