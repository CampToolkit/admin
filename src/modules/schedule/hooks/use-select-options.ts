import { useMemo } from "react";

import type { Auditorium } from "@/common/api/location/LocationApi.type";
import type { LessonType } from "@/common/api/lesson-type/LessonTypeApi.type";
import type { ActivityType } from "@/common/api/activity-type/ActivityTypeApi.type";
import type { Group } from "@/common/api/group/GroupApi.type";
import type { Coach } from "@/common/api/coach/CoachApi.type";

interface Args {
  activityTypes: ActivityType[];
  lessonTypes: LessonType[];
  campLocations: Auditorium[];
  groups: Group[];
  coaches: Coach[];
}

export function useSelectOptions(args: Args) {
  const { activityTypes, lessonTypes, campLocations, groups, coaches } = args;
  const activityTypeOptions = useMemo(
    () => activityTypes.map((item) => ({ label: item.name, value: item.id })),
    [activityTypes],
  );

  const lessonTypeOptions = useMemo(
    () => lessonTypes.map((item) => ({ label: item.name, value: item.id })),
    [lessonTypes],
  );

  const locationOptions = useMemo(
    () => campLocations.map((item) => ({ label: item.name, value: item.id })),
    [campLocations],
  );

  const groupOptions = useMemo(
    () => groups.map((item) => ({ label: item.name, value: item.id })),
    [groups],
  );

  const coachOptions = useMemo(
    () =>
      coaches.map((item) => ({
        label: `${item.lastName} ${item.firstName.at(0)}.${item.patrName.at(0)}.`,
        value: item.id,
      })),
    [coaches],
  );

  return {
    activityTypeOptions,
    lessonTypeOptions,
    locationOptions,
    groupOptions,
    coachOptions,
  };
}
