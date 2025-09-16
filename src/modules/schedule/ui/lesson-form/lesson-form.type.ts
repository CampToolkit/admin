import { Dayjs } from "dayjs";
import type { SelectOption } from "@/modules/schedule/ui/custom-select/custom-select.type.ts";

export interface LessonFormValues {
  startDate: Dayjs;
  endDate: Dayjs;
  lessonTypeId: number;
  activityTypeId: number;
  auditoriumId: number;
  coachId: number;
  groupId: number;
}

export interface LessonFormOptions {
  lessonTypeOptions: SelectOption<number>[];
  activityTypeOptions: SelectOption<number>[];
  groupOptions: SelectOption<number>[];
  coachOptions: SelectOption<number>[];
}

export type LessonFormProps = {
  formId: string;
  initialValues: LessonFormValues;
  onSubmit: (values: LessonFormValues) => void;
  options: LessonFormOptions;
};
