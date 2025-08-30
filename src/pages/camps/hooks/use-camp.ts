import { useCallback, useEffect, useState } from "react";
import type { Camp } from "@/shared/api/camp/CampApi.types.ts";
import { CampApi } from "@/shared/api/camp/CampApi.ts";

export function useCamp(id: number) {
  const [camp, setCamp] = useState<Camp | null>(null);

  const fetchCamp = useCallback(async (id: number) => {
    const camp = await CampApi.getOne(id);
    setCamp(camp);
  }, []);

  useEffect(() => {
    fetchCamp(id);
  }, []);

  return { camp, refreshCamp: fetchCamp };
}
