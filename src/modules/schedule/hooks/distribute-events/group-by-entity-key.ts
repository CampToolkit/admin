import type { Event } from "@/shared/api/event/EventApi.type.ts";

import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";

export type AccumulateEvent = Record<string, Event[]>;

export function groupByEntityKey<K extends EntityKeys<Event>>(
  acc: Record<string, Event[]>,
  item: Event,
  key: K,
) {
  const value = item[key];
  if (Array.isArray(value)) {
    for (const sub of value) {
      (acc[sub.id] ??= []).push(item);
    }
  } else {
    (acc[value.id] ??= []).push(item);
  }
  return acc;
}
