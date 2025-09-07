import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type {
  CreateGroupBulkDto,
  CreateGroupDto,
  UpdateGroupDto,
} from "@/shared/api/group/GroupApi.dto.ts";
import type { NativeCampEntityApi } from "@/shared/api/lib/types/BaseApi.type.ts";

export const GroupApi: NativeCampEntityApi<Group, CreateGroupDto> = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Group[]>("/practice-group");
    return data;
  },

  getByCamp: async (campId: number) => {
    // todo переделать на бэке путь на camp/campId/practice-group
    const { data } = await axiosConfig.get<Group[]>(
      `/camp/${campId}/practice-group/`,
    );
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Group>(`/practice-group/${id}`);
    return data;
  },

  create: async (dto: CreateGroupDto) => {
    console.log("DTO", dto);
    const { data } = await axiosConfig.post<Group>("/practice-group", dto);
    return data;
  },

  createMany: async (dto: CreateGroupBulkDto) => {
    const { data } = await axiosConfig.post<Group[]>(
      "/practice-group/bulk",
      dto,
    );
    return data;
  },

  update: async (id: number, dto: UpdateGroupDto) => {
    const { data } = await axiosConfig.patch<Group>(
      `/practice-group/${id}`,
      dto,
    );
    return data;
  },

  delete: async (id: number) => {
    await axiosConfig.delete(`/practice-group/${id}`);
  },
};
