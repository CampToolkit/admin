import { type Dayjs } from "dayjs";
import type { LessonFormValues } from "@/modules/schedule/ui/lesson-form/LessonForm.tsx";

const DEFAULT_VALUES = {
  lessonTypeId: 0,
  activityTypeId: 0,
  auditoriumId: 0,
  coachId: 0,
  groupId: 0,
};

export type RareLessonFormValues = {
  startDate: Dayjs;
} & Partial<Omit<LessonFormValues, "startDate">>;

export function prepareLessonFormValues(
  data: RareLessonFormValues,
): LessonFormValues {
  const endDate = data.startDate.clone().add(1, "hour");
  return {
    endDate,
    ...DEFAULT_VALUES,
    ...data,
  };
}
