import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import { useCallback, useEffect, useState } from "react";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";

export function useAllGroupsNotInCamp(campId: number) {
  const [state, setState] = useState<Group[]>([]);

  const fetch = useCallback(async () => {
    const allGroups = await GroupApi.getAll();
    const groups = allGroups.filter((item) => item.campId !== campId);
    setState(groups);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
}
