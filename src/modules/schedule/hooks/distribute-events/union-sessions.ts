import type { Event } from "@/shared/api/event/EventApi.type.ts";

import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";

export function unionSessions<K extends EntityKeys<Event>>(
  list: Event[],
  key: K,
): Record<string, Event[]> {
  // note попробовать поменять string на number
  const grouped: Record<string, Event[]> = {};

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
