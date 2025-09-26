export interface CreateLessonDto {
  campId: number;
  startDate: string;
  endDate: string;
  activityTypeId: number;
  auditoriumId: number;
  lessonTypeId: number;
  coaches?: CoachWithRoleDto[];
  groupIds?: number[];
  sportsmanIds?: number[];
}

// eslint-disable-next-line
export interface UpdateLessonDto extends Partial<CreateLessonDto> {}

export interface GetLessonDto extends Record<string, unknown> {
  campId: number;
  startDate?: string;
  endDate?: string;
  activityTypeId?: number;
  auditoriumId?: number;
  lessonTypeId?: number;
}

export type LessonCoachRole = "PRIMARY" | "SECONDARY";

// coach
export interface CoachWithRoleDto {
  coachId: number;
  role: LessonCoachRole;
}

export interface AppointCoachDto extends CoachWithRoleDto {
  lessonId: number;
}

// eslint-disable-next-line
export interface UpdateCoachDto extends Partial<AppointCoachDto> {}

// group
export interface AddGroupDto {
  lessonId: number;
  groupId: number;
}

// eslint-disable-next-line
export interface UpdateGroupDto extends Partial<AddGroupDto> {}

// sportsman
export interface AddSportsmanDto {
  lessonId: number;
  sportsmanId: number;
}

// eslint-disable-next-line
export interface UpdateSportsmanDto extends Partial<AddSportsmanDto> {}
