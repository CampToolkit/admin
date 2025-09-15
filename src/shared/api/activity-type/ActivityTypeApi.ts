import type { EntityApi } from "@/shared/api/lib/types/BaseApi.type.ts";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import type {
  CreateActivityTypeDto,
  UpdateActivityTypeBulkDto,
  UpdateActivityTypeDto,
} from "@/shared/api/activity-type/ActivityTypeApi.dto.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

export const ActivityTypeApi: EntityApi<ActivityType, CreateActivityTypeDto> = {
  getAll: async () => {
    const { data } = await axiosConfig.get<ActivityType[]>("/activity-type");
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<ActivityType>(
      `/activity-type/${id}`,
    );
    return data;
  },

  create: async (dto: CreateActivityTypeDto) => {
    const { data } = await axiosConfig.post<ActivityType>(
      "/activity-type",
      dto,
    );
    return data;
  },

  createMany: async (dto: UpdateActivityTypeBulkDto) => {
    const { data } = await axiosConfig.post<ActivityType[]>(
      "/activity-type/bulk",
      dto,
    );
    return data;
  },

  update: async (id: number, dto: UpdateActivityTypeDto) => {
    const { data } = await axiosConfig.patch<ActivityType>(
      `/activity-type/${id}`,
      dto,
    );
    return data;
  },

  delete: async (id: number) => {
    await axiosConfig.delete(`/activity-type/${id}`);
  },
};
