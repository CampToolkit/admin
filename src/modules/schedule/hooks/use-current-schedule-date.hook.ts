import { useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import type { Camp } from "@/shared/api/camp/CampApi.type.ts";

export function useCurrentScheduleDate(camp: Camp | null) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  useEffect(() => {
    if (!camp) return;

    const today = dayjs();
    const initialDate = today.isAfter(dayjs(camp?.endDate))
      ? dayjs(camp?.endDate)
      : today;

    setCurrentDate(initialDate);
  }, [camp]);

  return { currentDate, setCurrentDate };
}
