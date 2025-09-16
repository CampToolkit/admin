import { useMemo } from "react";

import type { CampsLocation } from "@/shared/api/location/LocationApi.type";
import type { LessonType } from "@/shared/api/lesson-type/LessonTypeApi.type";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type";
import type { Group } from "@/shared/api/group/GroupApi.type";
import type { Coach } from "@/shared/api/coach/CoachApi.type";

interface Args {
  activityTypes: ActivityType[];
  lessonTypes: LessonType[];
  campLocations: CampsLocation[];
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
    () => coaches.map((item) => ({ label: item.name, value: item.id })),
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
