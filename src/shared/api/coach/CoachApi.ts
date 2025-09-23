import type { RelatedCampEntityApi } from "@/shared/api/lib/types/BaseApi.type.ts";
import type { Coach } from "@/shared/api/coach/CoachApi.type.ts";
import type {
  AddCoachToCampDto,
  CreateCoachBulkDto,
  CreateCoachDto,
  RemoveCoachFromCampDto,
  UpdateCoachDto,
} from "@/shared/api/coach/CoachApi.dto.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

import { customDelete } from "@/shared/api/lib/utils/custom-delete.ts";

export const CoachApi: RelatedCampEntityApi<Coach, CreateCoachDto> = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Coach[]>("/coach");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Coach>(`/coach/${id}`);
    return data;
  },

  create: async (dto: CreateCoachDto) => {
    const { data } = await axiosConfig.post<Coach>("/coach", dto);
    return data;
  },

  createMany: async (dto: CreateCoachBulkDto) => {
    const { data } = await axiosConfig.post<Coach[]>(`/coach/bulk/`, dto);
    return data;
  },

  update: async (id: number, dto: UpdateCoachDto) => {
    const { data } = await axiosConfig.patch<Coach>(`/coach/${id}`, dto);
    return data;
  },

  getByCamp: async (campId: number) => {
    const { data } = await axiosConfig.get<Coach[]>(`/camp/${campId}/coach`);
    return data;
  },

  addManyToCamp: async (campId: number, dto: AddCoachToCampDto) => {
    await axiosConfig.post<Coach>(`/camp/${campId}/coach`, dto);
  },

  removeManyFromCamp: async (id: number, dto: RemoveCoachFromCampDto) => {
    return await customDelete({ path: `/api/camp/${id}/coach`, dto });
  },

  delete: async (id: number) => {
    await axiosConfig.delete(`/sportsman/${id}`);
  },
};
