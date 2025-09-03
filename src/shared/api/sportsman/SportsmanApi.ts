import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import type {
  AddSportsmanToCampDto,
  CreateSportsmanBulkDto,
  CreateSportsmanDto,
  RemoveSportsmanFromCampDto,
  UpdateSportsmanDto,
} from "@/shared/api/sportsman/SportsmanApi.dto.ts";
import { customDelete } from "@/shared/api/lib/utils/custom-delete.ts";

export const SportsmanApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Sportsman[]>("sportsman");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Sportsman>(`/sportsman/${id}`);
    return data;
  },

  create: async (dto: CreateSportsmanDto) => {
    const { data } = await axiosConfig.post<Sportsman>("/sportsman", dto);
    return data;
  },

  createMany: async (dto: CreateSportsmanBulkDto) => {
    console.log("createMany", dto);
    const { data } = await axiosConfig.post<Sportsman[]>(
      `/sportsman/bulk/`,
      dto,
    );
    return data;
  },

  update: async (id: number, dto: UpdateSportsmanDto) => {
    const { data } = await axiosConfig.patch<Sportsman>(
      `/sportsman/${id}`,
      dto,
    );
    return data;
  },

  getCampSportsmen: async (campId: number) => {
    const { data } = await axiosConfig.get<Sportsman[]>(
      `/camp/${campId}/sportsman`,
    );
    return data;
  },

  addManyToCamp: async (campId: number, dto: AddSportsmanToCampDto) => {
    console.log("addManyToCamp", dto);
    const { data } = await axiosConfig.post<Sportsman>(
      `/camp/${campId}/sportsman`,
      dto,
    );
    return data;
  },

  removeManyFromCamp: async (id: number, dto: RemoveSportsmanFromCampDto) => {
    return await customDelete({ path: `/api/camp/${id}/sportsman`, dto });
  },

  delete: async (id: number) => {
    const { data } = await axiosConfig.delete(`/sportsman/${id}`);
    return data;
  },
};
