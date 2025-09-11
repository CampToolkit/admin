import { axiosConfig } from "@/shared/api/axios-config.ts";

import type {
  AddManyLocationToCampDto,
  CreateLocationDto,
  CreateManyLocationDto,
  RemoveLocationFromCampDto,
  UpdateLocationDto,
} from "@/shared/api/location/LocationApi.dto.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import { customDelete } from "@/shared/api/lib/utils/custom-delete.ts";

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

  createMany: async (dto: CreateManyLocationDto) => {
    const { data } = await axiosConfig.post<CampsLocation[]>(
      `/auditorium/bulk/`,
      dto,
    );
    return data;
  },

  update: async (id: number, dto: UpdateLocationDto) => {
    const { data } = await axiosConfig.patch<CampsLocation>(
      `/auditorium/${id}`,
      dto,
    );
    return data;
  },

  async getByCamp(campId: number) {
    const { data } = await axiosConfig.get<CampsLocation[]>(
      `/camp/${campId}/auditorium`,
    );
    return data;
  },

  addManyToCamp: async (campId: number, dto: AddManyLocationToCampDto) => {
    const { data } = await axiosConfig.post<CampsLocation>(
      `/camp/${campId}/auditorium`,
      dto,
    );
    return data;
  },

  removeFromCamp: async (campId: number, dto: RemoveLocationFromCampDto) => {
    return await customDelete<CampsLocation, RemoveLocationFromCampDto>({
      path: `/camp/${campId}/auditorium`,
      dto,
    });
  },

  delete: async (id: number) => {
    const { data } = await axiosConfig.delete(`/auditorium/${id}`);
    return data;
  },
};
