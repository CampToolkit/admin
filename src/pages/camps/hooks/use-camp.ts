import { useCallback, useEffect, useState } from "react";
import type { Camp } from "@/shared/api/camp/CampApi.type.ts";
import { CampApi } from "@/shared/api/camp/CampApi.ts";

export function useCamp(id: number) {
  const [state, setState] = useState<Camp | null>(null);

  const fetch = useCallback(async (id: number) => {
    const item = await CampApi.getOne(id);
    setState(item);
  }, []);

  useEffect(() => {
    fetch(id);
  }, []);

  return { camp: state, refreshCamp: fetch };
}
