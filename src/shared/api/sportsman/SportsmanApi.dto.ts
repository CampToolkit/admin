export interface CreateSportsmanDto {
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate?: string;
}

// eslint-disable-next-line
export interface UpdateSportsmanDto extends Partial<CreateSportsmanDto> {}

// note sportsmanId
export interface AddSportsmanToCampDto {
  items: number[];
}

// eslint-disable-next-line
export interface RemoveSportsmanFromCampDto extends AddSportsmanToCampDto {}
