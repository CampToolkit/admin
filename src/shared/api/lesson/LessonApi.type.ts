import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

import type { Coach } from "@/shared/api/coach/CoachApi.type.ts";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import type { LessonType } from "@/shared/api/lesson-type/LessonTypeApi.type.ts";

export interface Lesson extends Entity {
  startDate: string;
  endDate: string;
  activityType: ActivityType;
  auditorium: CampsLocation;
  lessonType: LessonType;
  coaches: (Coach & { lesson_coach: number })[];
  groups: (Group & { lesson_group: number })[];
  sportsmen: (Sportsman & { lesson_sportsman: number })[];
}
