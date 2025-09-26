import type { Entity } from "@/common/api/lib/types/Entity.type.ts";

import type { Group } from "@/common/api/group/GroupApi.type.ts";
import type { Sportsman } from "@/common/api/sportsman/SportsmanApi.type.ts";

import type { Coach } from "@/common/api/coach/CoachApi.type.ts";
import type { ActivityType } from "@/common/api/activity-type/ActivityTypeApi.type.ts";
import type { Auditorium } from "@/common/api/location/LocationApi.type.ts";
import type { LessonType } from "@/common/api/lesson-type/LessonTypeApi.type.ts";

export interface Event extends Entity {
  startDate: string;
  endDate: string;
  activityType: ActivityType;
  auditorium: Auditorium;
  lessonType: LessonType;
  coaches: (Coach & { lesson_coach: number })[];
  groups: (Group & { lesson_group: number })[];
  sportsmen: (Sportsman & { lesson_sportsman: number })[];
}

export interface Event_Coach extends Entity {
  lessonId: number;
  coachId: number;
  role: "PRIMARY" | "SECONDARY";
}

export interface Event_Group extends Entity {
  lessonId: number;
  groupId: number;
}

export interface Event_Sportsman extends Entity {
  lessonId: number;
  sportsmanId: number;
}
