export interface CreateLocationDto {
  campId: number;
  name: string;
}

export interface UpdateLocationDto {
  name: string;
}

export interface RemoveLocationFromCampDto {
  campId: number;
}
