import { useCallback, useEffect, useState } from "react";
import type { Coach } from "@/common/api/coach/CoachApi.type.ts";
import { CoachApi } from "@/common/api/coach/CoachApi.ts";

export function useCoach(campId?: number) {
  const [state, setState] = useState<Coach[]>([]);

  const fetch = useCallback(async () => {
    const data: Coach[] = campId
      ? await CoachApi.getByCamp(campId)
      : await CoachApi.getAll();

    setState(data);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
}
