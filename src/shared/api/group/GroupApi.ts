import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type {
  CreateGroupBulkDto,
  CreateGroupDto,
  UpdateGroupDto,
} from "@/shared/api/group/GroupApi.dto.ts";

export const GroupApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Group[]>("/group");
    return data;
  },

  getCampGroups: async (campId: number) => {
    const { data } = await axiosConfig.get<Group[]>(`/group/camp/${campId}`);
    return data;
  },

  getOne: async (id: number) => {
    const { data } = await axiosConfig.get<Group>(`/group/${id}`);
    return data;
  },

  create: async (dto: CreateGroupDto) => {
    const { data } = await axiosConfig.post<Group>("/group", dto);
    return data;
  },

  createMany: async (dto: CreateGroupBulkDto) => {
    const { data } = await axiosConfig.post<Group[]>("/group/bulk", dto);
    return data;
  },

  update: async (id: number, dto: UpdateGroupDto) => {
    const { data } = await axiosConfig.patch<Group>(`/group/${id}`, dto);
    return data;
  },
};
