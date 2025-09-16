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
