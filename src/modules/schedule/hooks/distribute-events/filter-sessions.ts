import type { Event } from "@/shared/api/event/EventApi.type.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/distribute-events/EntityKeys.type.ts";

export function filterSessions<K extends EntityKeys<Event>>(
  list: Event[],
  filter: {
    key: K;
    value: number;
  },
) {
  return list.filter((item: Event) => {
    const value = item[filter.key];
    if (Array.isArray(value)) {
      return value.some((subItem) => subItem.id === filter.value);
    } else {
      return value.id === filter.value;
    }
  });
}
