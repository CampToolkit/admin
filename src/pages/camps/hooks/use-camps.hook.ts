import { useEffect, useState } from "react";
import { CampApi } from "@/shared/api/camp/CampApi.ts";
import type { Camp } from "@/shared/api/camp/CampApi.types.ts";

export function useCamps() {
  const [camps, setCamps] = useState<Camp[]>([]);

  async function getCamps() {
    const camps = await CampApi.getAll();
    setCamps(camps);
  }

  useEffect(() => {
    getCamps();
  }, []);

  return { camps };
}
