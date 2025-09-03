import type { AddManyToCampDto } from "@/shared/api/lib/types/AddManyToCamp.dto.ts";

export interface CreateLocationDto {
  campId: number;
  name: string;
}

export interface UpdateLocationDto {
  name: string;
}

// eslint-disable-next-line
export interface AddManyLocationToCampDto extends AddManyToCampDto {}
// eslint-disable-next-line
export interface RemoveLocationFromCampDto extends AddManyToCampDto {}
