import { BaseApi } from "@/shared/api/api-classes/BaseApi.ts";
import { axiosConfig } from "@/shared/api/axios-config.ts";

export class CampEntityApi<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TBulkDto = TCreateDto[],
> extends BaseApi<TEntity, TCreateDto, TUpdateDto, TBulkDto> {
  async getByCamp(campId: number): Promise<TEntity[]> {
    const { data } = await axiosConfig.get<TEntity[]>(
      `/camp/${campId}${this.basePath}`,
    );
    return data;
  }
}
