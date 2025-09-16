import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import type { RelatedCampEntity } from "@/shared/api/lib/types/RelatedCampEntity.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import type { Person } from "@/shared/api/lib/types/Person.type.ts";

export interface Lesson extends Entity {
  campId: number;
  startDate: string;
  endDate: string;
  // todo переделать, когда будет Coach
  coach: Person;
  // todo переделать, когда будут определены соответствующие сущности
  activity: RelatedCampEntity;
  auditorium: RelatedCampEntity;
  lessonType: RelatedCampEntity;
  groups: Group[];
  sportsmen: Sportsman[];
}
