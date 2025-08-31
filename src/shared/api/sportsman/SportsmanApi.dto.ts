export interface CreateSportsmanDto {
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate?: string;
}

export interface UpdateSportsmanDto {
  lastName?: string;
  firstName?: string;
  patrName?: string;
  birthDate?: string;
}

export interface RemoveSportsmanFromCampDto {
  campId: number;
}

export interface AddSportsmanToCampDto {
  campId: number;
}
