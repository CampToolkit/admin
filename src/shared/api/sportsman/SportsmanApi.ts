import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import type {
  CreateSportsmanDto,
  UpdateSportsmanDto,
} from "@/shared/api/sportsman/SportsmanApi.dto.ts";

export const SportsmanApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Sportsman[]>("/camp");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Sportsman>(`/camp/${id}`);
    return data;
  },

  create: async (dto: CreateSportsmanDto) => {
    const { data } = await axiosConfig.post<Sportsman>("/camp", dto);
    return data;
  },

  update: async (id: number, dto: UpdateSportsmanDto) => {
    const { data } = await axiosConfig.patch<Sportsman>(`/camp/${id}`, dto);
    return data;
  },
};
