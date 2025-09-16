import { CampEntityApi } from "@/shared/api/api-classes/CampEntityApi.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import type {
  CreateLessonDto,
  UpdateLessonDto,
} from "@/shared/api/lesson/LessonApi.dto.ts";

export const LessonApi = new CampEntityApi<
  Lesson,
  CreateLessonDto,
  UpdateLessonDto
>("/lesson");
