import type { Group } from "@/common/api/group/GroupApi.type.ts";
import type {
  AddSportsmenToGroupDto,
  CreateGroupDto,
} from "@/common/api/group/GroupApi.dto.ts";
import { CampEntityApi } from "@/common/api/api-classes/CampEntityApi.ts";
import type { UpdateGroupDto } from "@/common/api/event/EventApi.dto.ts";
import { axiosConfig } from "@/common/api/axios-config.ts";

export class ClassGroupApi extends CampEntityApi<
  Group,
  CreateGroupDto,
  UpdateGroupDto
> {
  async addSportsmen(id: number, dto: AddSportsmenToGroupDto) {
    const { data } = await axiosConfig.post(
      `/practice-group/${id}/sportsman`,
      dto,
    );
    return data;
  }
}
