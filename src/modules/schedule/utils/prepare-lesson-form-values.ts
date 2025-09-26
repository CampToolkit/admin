import { type Dayjs } from "dayjs";
import type { LessonFormValues } from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import type { ActivityType } from "@/common/api/activity-type/ActivityTypeApi.type.ts";
import type { LessonType } from "@/common/api/lesson-type/LessonTypeApi.type.ts";
import type { Auditorium } from "@/common/api/location/LocationApi.type.ts";

export type RareLessonFormValues = {
  startDate: Dayjs;
} & Partial<Omit<LessonFormValues, "startDate">>;

interface Props {
  values: RareLessonFormValues;
  options: {
    activityTypes: ActivityType[];
    lessonTypes: LessonType[];
    campLocations: Auditorium[];
  };
}

export function prepareLessonFormValues({
  values,
  options,
}: Props): LessonFormValues {
  console.log("before", values);
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
    ...values,
    lessonTypeId: values.lessonTypeId ? values.lessonTypeId : 0,
    activityTypeId: values.activityTypeId ? values.activityTypeId : 0,
    auditoriumId: values.auditoriumId ? values.auditoriumId : 0,
    coachId: values.coachId ? values.coachId : 0,
    groupId: values.groupId ? values.groupId : 0,
  };
}
