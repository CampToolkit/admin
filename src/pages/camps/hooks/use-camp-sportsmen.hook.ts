import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import { useEffect, useState } from "react";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

export function useCampSportsmen(campId: number) {
  const [sportsmen, setSportsmen] = useState<Sportsman[]>([]);

  async function fetchSportsmen(campId: number) {
    const sportsmen = await SportsmanApi.getCampSportsmen(campId);
    setSportsmen(sportsmen);
  }

  useEffect(() => {
    fetchSportsmen(campId);
  }, []);

  return { sportsmen, refreshSportsmen: fetchSportsmen };
}
