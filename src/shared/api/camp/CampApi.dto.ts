export interface CreateCampDto {
  name: string;
  city: string;
  startDate: string; // ISO-строка
  endDate: string;
}

export interface UpdateCampDto {
  name?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
}
