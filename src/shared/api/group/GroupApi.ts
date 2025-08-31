import { axiosConfig } from "@/shared/api/axios-config.ts";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type {
  CreateGroupDto,
  UpdateGroupDto,
} from "@/shared/api/group/GroupApi.dto.ts";

export const GroupApi = {
  getAll: async () => {
    const { data } = await axiosConfig.get<Group[]>("/group");
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

  update: async (id: number, dto: UpdateGroupDto) => {
    const { data } = await axiosConfig.patch<Group>(`/group/${id}`, dto);
    return data;
  },
};
