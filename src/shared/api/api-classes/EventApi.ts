import { BaseApi } from "@/shared/api/api-classes/BaseApi.ts";
import type {
  Event,
  Event_Coach,
  Event_Group,
} from "@/shared/api/event/EventApi.type.ts";
import type {
  AddGroupDto,
  AppointCoachDto,
  CreateLessonDto,
  GetLessonDto,
  UpdateCoachDto,
  UpdateGroupDto,
  UpdateLessonDto,
} from "@/shared/api/event/EventApi.dto.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

export class ClassEventApi extends BaseApi<
  Event,
  CreateLessonDto,
  UpdateLessonDto
> {
  override async getAll(): Promise<Event[]>;
  override async getAll(params: GetLessonDto): Promise<Event[]>;

  override async getAll(params?: GetLessonDto): Promise<Event[]> {
    if (params) {
      return super.getAll(params);
    } else {
      return super.getAll();
    }
  }

  // coach
  async appointCoach(dto: AppointCoachDto) {
    const { data } = await axiosConfig.post<Event_Coach>("lesson-coach", dto);
    return data;
  }

  async updateCoach(lessonCoachId: number, dto: UpdateCoachDto) {
    const { data } = await axiosConfig.patch<Event_Coach>(
      `lesson-coach/${lessonCoachId}`,
      dto,
    );
    return data;
  }

  async deleteCoach(lessonCoachId: number) {
    return await axiosConfig.delete(`lesson-coach/${lessonCoachId}`);
  }

  // group
  async addGroup(dto: AddGroupDto) {
    const { data } = await axiosConfig.post<Event_Group>("lesson-group", dto);
    return data;
  }

  async updateGroup(dto: UpdateGroupDto) {
    const { data } = await axiosConfig.patch<Event_Group>("lesson-group", dto);
    return data;
  }

  async deleteGroup(id: number) {
    return await axiosConfig.delete(`lesson-group/${id}`);
  }

  //sportsman
  async addSportsman(dto: AddGroupDto) {
    const { data } = await axiosConfig.post<Event_Group>("lesson-group", dto);
    return data;
  }

  async updateSportsman(dto: UpdateGroupDto) {
    const { data } = await axiosConfig.patch<Event_Group>("lesson-group", dto);
    return data;
  }

  async deleteSportsman(id: number) {
    return await axiosConfig.delete(`lesson-group/${id}`);
  }
}
