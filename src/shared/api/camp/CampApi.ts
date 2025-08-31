import { axiosConfig } from "@/shared/api/axios-config.ts";
import type {
  CreateCampDto,
  UpdateCampDto,
} from "@/shared/api/camp/CampApi.dto.ts";
import type { Camp } from "@/shared/api/camp/CampApi.type.ts";

export const CampApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Camp[]>("/camp");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Camp>(`/camp/${id}`);
    return data;
  },

  create: async (dto: CreateCampDto) => {
    const { data } = await axiosConfig.post<Camp>("/camp", dto);
    return data;
  },

  update: async (id: number, dto: UpdateCampDto) => {
    const { data } = await axiosConfig.patch<Camp>(`/camp/${id}`, dto);
    return data;
  },
};
