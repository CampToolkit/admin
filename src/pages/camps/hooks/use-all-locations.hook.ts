import { useCallback, useEffect, useState } from "react";

import { LocationApi } from "@/common/api/location/LocationApi.ts";
import type { CampsLocation } from "@/common/api/location/LocationApi.type.ts";

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
