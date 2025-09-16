export interface CreateCoachDto {
  firstName: string;
  lastName: string;
  patrName: string;
}

export interface CreateCoachBulkDto {
  items: CreateCoachDto[];
}

// eslint-disable-next-line
export interface UpdateCoachDto extends Partial<CreateCoachDto> {}

// note coachId
export interface AddCoachToCampDto {
  items: number[];
}

// eslint-disable-next-line
export interface RemoveCoachFromCampDto extends AddCoachToCampDto {}
