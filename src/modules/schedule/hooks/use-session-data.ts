import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import type { LessonFormValues } from "@/modules/schedule/components/LessonForm.tsx";

const DEFAULT_VALUES: LessonFormValues = {
  startDate: dayjs(),
  endDate: dayjs().add(1, "hour"),
  lessonTypeId: 0,
  activityTypeId: 0,
  auditoriumId: 0,
  coachId: 0,
  groupId: 0,
};

type SessionInput = {
  startDate: Dayjs;
  endDate: Dayjs;
} & Partial<Omit<LessonFormValues, "startDate" | "endDate">>;

export function useSessionData() {
  const [sessionData, setSessionData] = useState<LessonFormValues | null>(null);

  const openSession = (data: SessionInput) => {
    const merged: LessonFormValues = {
      ...DEFAULT_VALUES,
      ...data,
    };
    setSessionData(merged);
  };

  const closeSession = () => {
    setSessionData(null);
  };

  return {
    sessionData,
    openSession,
    closeSession,
  };
}
