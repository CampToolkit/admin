import { BaseApi } from "@/shared/api/api-classes/BaseApi.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

export class LessonApi<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TBulkDto = TCreateDto[],
> extends BaseApi<TEntity, TCreateDto, TUpdateDto, TBulkDto> {
  async getAll(): Promise<TEntity[]> {}
}
