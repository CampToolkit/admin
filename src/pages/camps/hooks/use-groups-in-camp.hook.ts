import { useCallback, useEffect, useState } from "react";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";

export function useGroupsInCamp(campId: number) {
  const [state, setState] = useState<Group[]>([]);

  const fetch = useCallback(async (campId: number) => {
    const data = await GroupApi.getByCamp?.(campId);
    if (data) {
      setState(data);
    }
  }, []);

  useEffect(() => {
    fetch(campId);
  }, []);

  return { state, fetch };
}
