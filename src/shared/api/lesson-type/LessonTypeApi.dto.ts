export interface CreateLessonTypeDto {
  name: string;
}

export interface CreateLessonTypeBulkDto {
  items: CreateLessonTypeDto[];
}

// eslint-disable-next-line
export interface UpdateLessonTypeDto extends Partial<CreateLessonTypeDto> {}
