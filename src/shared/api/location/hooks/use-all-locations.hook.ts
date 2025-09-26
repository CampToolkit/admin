import { useCallback, useEffect, useState } from "react";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";

export function useAllLocations() {
  const [state, setState] = useState<CampsLocation[]>([]);

  const fetch = useCallback(async () => {
    const response = await LocationApi.getAll();
    setState(response);
  }, []);

  useEffect(() => {
    fetch();
  }, []);
  return { state, fetch };
}
