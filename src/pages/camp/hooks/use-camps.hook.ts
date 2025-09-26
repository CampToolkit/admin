import { useCallback, useEffect, useState } from "react";
import { CampApi } from "@/common/api/camp/CampApi.ts";
import type { Camp } from "@/common/api/camp/CampApi.type.ts";

export function useCamps() {
  const [camps, setCamps] = useState<Camp[]>([]);

  const fetchCamps = useCallback(async () => {
    const camps = await CampApi.getAll();
    setCamps(camps);
  }, []);

  useEffect(() => {
    fetchCamps();
  }, []);

  return { camps, refreshCamps: fetchCamps };
}
