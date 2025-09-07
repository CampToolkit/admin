import type { AddManyToCampDto } from "@/shared/api/lib/types/AddManyToCamp.dto.ts";

export interface CreateLocationDto {
  name: string;
}

export interface UpdateLocationDto {
  name: string;
}

export interface CreateManyLocationDto {
  items: CreateLocationDto[];
}

// eslint-disable-next-line
export interface AddManyLocationToCampDto extends AddManyToCampDto {}
// eslint-disable-next-line
export interface RemoveLocationFromCampDto extends AddManyToCampDto {}
