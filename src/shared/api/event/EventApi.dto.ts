export interface CreateLessonDto {
  campId: number;
  startDate: string;
  endDate: string;
  activityTypeId: number;
  auditoriumId: number;
  lessonTypeId: number;
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

// coach
export interface AppointCoachDto {
  lessonId: number;
  coachId: number;
  role: "PRIMARY" | "SECONDARY";
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
