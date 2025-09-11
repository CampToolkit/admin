import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import { useCallback, useEffect, useState } from "react";
import { LocationApi } from "@/shared/api/location/LocationApi.ts";

export function useCampLocationsByCamp(campId: number) {
  const [state, setState] = useState<CampsLocation[]>([]);

  const fetch = useCallback(async (campId: number) => {
    const items = await LocationApi.getByCamp(campId);
    setState(items);
  }, []);

  useEffect(() => {
    fetch(campId);
  }, []);

  return { state, fetch };
}
