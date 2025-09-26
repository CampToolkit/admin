import { useCallback, useEffect, useState } from "react";

import { LocationApi } from "@/common/api/location/LocationApi.ts";
import type { Auditorium } from "@/common/api/location/LocationApi.type.ts";

export function useAllLocations() {
  const [state, setState] = useState<Auditorium[]>([]);

  const fetch = useCallback(async () => {
    const response = await LocationApi.getAll();
    setState(response);
  }, []);

  useEffect(() => {
    fetch();
  }, []);
  return { state, fetch };
}
