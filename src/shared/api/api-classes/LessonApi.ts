import { BaseApi } from "@/shared/api/api-classes/BaseApi.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import type {
  CreateLessonDto,
  GetLessonDto,
  UpdateLessonDto,
} from "@/shared/api/lesson/LessonApi.dto.ts";

export class CampLessonApi extends BaseApi<
  Lesson,
  CreateLessonDto,
  UpdateLessonDto
> {
  override async getAll(): Promise<Lesson[]>;
  override async getAll(params: GetLessonDto): Promise<Lesson[]>;

  override async getAll(params?: GetLessonDto): Promise<Lesson[]> {
    if (params) {
      return super.getAll(params);
    } else {
      return super.getAll();
    }
  }
}
