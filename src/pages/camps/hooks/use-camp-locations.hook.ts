import { useCallback, useEffect, useState } from "react";
import { LocationApi } from "@/common/api/location/LocationApi.ts";
import type { CampsLocation } from "@/common/api/location/LocationApi.type.ts";

export const useCampLocations = () => {
  const [state, setState] = useState<CampsLocation[]>([]);

  const fetch = useCallback(async () => {
    const items = await LocationApi.getAll();
    setState(items);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
};
