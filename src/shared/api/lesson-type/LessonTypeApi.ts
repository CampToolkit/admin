import type { EntityApi } from "@/shared/api/lib/types/BaseApi.type.ts";
import type { LessonType } from "@/shared/api/lesson-type/LessonTypeApi.type.ts";
import type {
  CreateLessonTypeBulkDto,
  CreateLessonTypeDto,
  UpdateLessonTypeDto,
} from "@/shared/api/lesson-type/LessonTypeApi.dto.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

export const LessonTypeApi: EntityApi<LessonType, CreateLessonTypeDto> = {
  getAll: async () => {
    const { data } = await axiosConfig.get<LessonType[]>("/lesson-type");
    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<LessonType>(`/lesson-type/${id}`);
    return data;
  },

  create: async (dto: CreateLessonTypeDto) => {
    console.log("DTO", dto);
    const { data } = await axiosConfig.post<LessonType>("/lesson-type", dto);
    return data;
  },

  createMany: async (dto: CreateLessonTypeBulkDto) => {
    const { data } = await axiosConfig.post<LessonType[]>(
      "/lesson-type/bulk",
      dto,
    );
    return data;
  },

  update: async (id: number, dto: UpdateLessonTypeDto) => {
    const { data } = await axiosConfig.patch<LessonType>(
      `/lesson-type/${id}`,
      dto,
    );
    return data;
  },

  delete: async (id: number) => {
    console.log("DTO", id);
    throw new Error("not implemented yet!");
  },
};
