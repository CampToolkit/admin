import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import type {
  AddSportsmanToCampDto,
  CreateSportsmanDto,
  RemoveSportsmanFromCampDto,
  UpdateSportsmanDto,
} from "@/shared/api/sportsman/SportsmanApi.dto.ts";

export const SportsmanApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Sportsman[]>("/sportsman");
    return data;
  },

  getCampSportsmen: async (campId: number) => {
    const { data } = await axiosConfig.get<Sportsman[]>(
      `/sportsman/camp/${campId}`,
    );
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

  update: async (id: number, dto: UpdateSportsmanDto) => {
    const { data } = await axiosConfig.patch<Sportsman>(
      `/sportsman/${id}`,
      dto,
    );
    return data;
  },

  addToCamp: async (id: number, dto: AddSportsmanToCampDto) => {
    const { data } = await axiosConfig.post<Sportsman>(
      `/sportsman/${id}/camp`,
      dto,
    );
    return data;
  },

  removeFromCamp: async (id: number, dto: RemoveSportsmanFromCampDto) => {
    const { data } = await axiosConfig.put<Sportsman>(
      `/sportsman/${id}/camp`,
      dto,
    );
    return data;
  },

  delete: async (id: number) => {
    const data = await axiosConfig.delete(`/sportsman/${id}`);
    return data;
  },
};
