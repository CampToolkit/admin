import type { Event } from "@/shared/api/event/EventApi.type.ts";
import { useCallback, useEffect, useState } from "react";
import { EventApi } from "@/shared/api/event/EventApi.ts";

export function useLessons(campId: number) {
  const [state, setState] = useState<Event[]>([]);

  const fetch = useCallback(async (campId: number) => {
    const data = await EventApi.getAll({ campId });
    setState(data);
  }, []);

  useEffect(() => {
    fetch(campId);
  }, []);

  return { state, fetch };
}
