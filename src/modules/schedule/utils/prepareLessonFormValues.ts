import { type Dayjs } from "dayjs";
import type { LessonFormValues } from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import type { LessonType } from "@/shared/api/lesson-type/LessonTypeApi.type.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";

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

interface Props {
  values: RareLessonFormValues;
  options: {
    activityTypes: ActivityType[];
    lessonTypes: LessonType[];
    campLocations: CampsLocation[];
  };
}

export function prepareLessonFormValues({
  values,
  options,
}: Props): LessonFormValues {
  if (options.activityTypes.length > 0) {
    values.activityTypeId ??= options.activityTypes[0].id;
  }
  if (options.lessonTypes.length > 0) {
    values.lessonTypeId ??= options.lessonTypes[0].id;
  }
  if (options.campLocations.length > 0) {
    values.auditoriumId ??= options.campLocations[0].id;
  }
  const endDate = values.startDate.clone().add(1, "hour");
  return {
    endDate,
    ...DEFAULT_VALUES,
    ...values,
  };
}
