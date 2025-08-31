import { axiosConfig } from "@/shared/api/axios-config.ts";

import type {
  CreateLocationDto,
  RemoveLocationFromCampDto,
  UpdateLocationDto,
} from "@/shared/api/location/LocationApi.dto.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";

export const LocationApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<CampsLocation[]>("/auditorium");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<CampsLocation>(`/auditorium/${id}`);
    return data;
  },

  create: async (dto: CreateLocationDto) => {
    const { data } = await axiosConfig.post<CampsLocation>("/auditorium", dto);
    return data;
  },

  update: async (id: number, dto: UpdateLocationDto) => {
    const { data } = await axiosConfig.patch<CampsLocation>(
      `/auditorium/${id}`,
      dto,
    );
    return data;
  },

  removeFromCamp: async (id: number, dto: RemoveLocationFromCampDto) => {
    const { data } = await axiosConfig.delete(`/auditorium/${id}`);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await axiosConfig.delete(`/auditorium/${id}`);
    return data;
  },
};
