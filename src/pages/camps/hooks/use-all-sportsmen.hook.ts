import { useCallback, useEffect, useState } from "react";
import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

export function useAllSportsmen() {
  const [state, setState] = useState<Sportsman[]>([]);

  const fetch = useCallback(async () => {
    const response = await SportsmanApi.getAll();
    setState(response);
  }, []);

  useEffect(() => {
    fetch();
  }, []);
  return { state, fetch };
}
