import { useEffect, useState } from "react";
import { CampApi } from "@/shared/api/api-services.ts";

export function useCamps() {
  const [camps, setCamps] = useState([]);

  async function getCamps() {
    const camps = await CampApi.getAll();
    setCamps(camps.data);
  }

  useEffect(() => {
    getCamps();
  }, []);

  return { camps };
}
