import { useCallback, useEffect, useState } from "react";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import { ActivityTypeApi } from "@/shared/api/activity-type/ActivityTypeApi";

export function useActivityType() {
  const [state, setState] = useState<ActivityType[]>([]);

  const fetch = useCallback(async () => {
    const items = await ActivityTypeApi.getAll();
    setState(items);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
}
