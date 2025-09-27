import type { Sportsman } from "@/common/api/sportsman/SportsmanApi.type.ts";
import { useCallback, useEffect, useState } from "react";
import { GroupApi } from "@/common/api/group/GroupApi.ts";

export function useGroupsSportsmen(groupId: number) {
  const [state, setState] = useState<Sportsman[]>([]);

  const fetch = useCallback(async (groupId: number) => {
    const data = await GroupApi.getSportsmen(groupId);
    setState(data);
  }, []);

  useEffect(() => {
    fetch(groupId);
  }, []);

  return { state, fetch };
}
