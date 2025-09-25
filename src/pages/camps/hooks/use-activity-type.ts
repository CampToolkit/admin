import { useCallback, useEffect, useState } from "react";
import type { ActivityType } from "@/common/api/activity-type/ActivityTypeApi.type.ts";
import { ActivityTypeApi } from "@/common/api/activity-type/ActivityTypeApi";

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
