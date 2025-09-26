import type { Sportsman } from "@/common/api/sportsman/SportsmanApi.type.ts";
import { useEffect, useState } from "react";
import { SportsmanApi } from "@/common/api/sportsman/SportsmanApi.ts";

export function useCampSportsmen(campId: number) {
  const [state, setState] = useState<Sportsman[]>([]);

  async function fetch(campId: number) {
    const sportsmen = await SportsmanApi.getByCamp(campId);
    setState(sportsmen);
  }

  useEffect(() => {
    fetch(campId);
  }, []);

  return { state, fetch };
}
