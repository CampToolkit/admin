import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import type {
  AddSportsmanToCampDto,
  CreateSportsmanBulkDto,
  CreateSportsmanDto,
  RemoveSportsmanFromCampDto,
  UpdateSportsmanDto,
} from "@/shared/api/sportsman/SportsmanApi.dto.ts";

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
    console.log(dto);
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
    const { data } = await axiosConfig.post<Sportsman>(
      `/camp/${campId}/sportsman`,
      dto,
    );
    return data;
  },

  // note потому что axios не принимает body в delete
  removeManyFromCamp: async (id: number, dto: RemoveSportsmanFromCampDto) => {
    const res = await fetch(`/api/camp/${id}/sportsman`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete: ${res.status} ${errorText}`);
    }

    if (res.status !== 204) {
      return res.json();
    }

    return null;
  },

  delete: async (id: number) => {
    const { data } = await axiosConfig.delete(`/sportsman/${id}`);
    return data;
  },
};
