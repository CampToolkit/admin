import type { Group } from "@/common/api/group/GroupApi.type.ts";
import type {
  AddSportsmenToGroupDto,
  CreateGroupBulkDto,
  CreateGroupDto,
} from "@/common/api/group/GroupApi.dto.ts";
import { CampEntityApi } from "@/common/api/api-classes/CampEntityApi.ts";
import type { UpdateGroupDto } from "@/common/api/event/EventApi.dto.ts";
import { axiosConfig } from "@/common/api/axios-config.ts";
import type { Sportsman } from "@/common/api/sportsman/SportsmanApi.type.ts";

export class ClassGroupApi extends CampEntityApi<
  Group,
  CreateGroupDto,
  UpdateGroupDto,
  CreateGroupBulkDto
> {
  // todo удаление спортсмена из группы (в api тоже)
  async getSportsmen(groupId: number) {
    const { data } = await axiosConfig.get<Sportsman[]>(
      `/practice-group/${groupId}/sportsman`,
    );
    return data;
  }

  async addSportsmen(id: number, dto: AddSportsmenToGroupDto) {
    const { data } = await axiosConfig.post(
      `/practice-group/${id}/sportsman`,
      dto,
    );
    return data;
  }
}
