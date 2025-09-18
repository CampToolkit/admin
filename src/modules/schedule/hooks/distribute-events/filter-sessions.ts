import type { Event } from "@/shared/api/event/EventApi.type.ts";
import type { EntityKeys } from "@/modules/schedule/hooks/filter-union-sessions/EntityKeys.type.ts";

export function filterSessions<K extends EntityKeys<Lesson>>(
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
