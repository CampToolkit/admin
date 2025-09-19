import type { Event } from "@/shared/api/event/EventApi.type.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";

export function matchEntity<K extends EntityKeys<Event>>(
  item: Event,
  filter: { key: K; value: number },
) {
  const value = item[filter.key];
  if (Array.isArray(value)) {
    return value.some((sub) => sub.id === filter.value);
  }
  return value.id === filter.value;
}
