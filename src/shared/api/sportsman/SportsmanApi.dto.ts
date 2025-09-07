export interface CreateSportsmanDto {
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate?: string;
}

export interface CreateSportsmanBulkDto {
  items: CreateSportsmanDto[];
}

// eslint-disable-next-line
export interface UpdateSportsmanDto extends Partial<CreateSportsmanDto> {}

// note sportsmanId
export interface AddSportsmenToCampDto {
  items: number[];
}

// eslint-disable-next-line
export interface RemoveSportsmanFromCampDto extends AddSportsmenToCampDto {}
