import { axiosConfig } from "@/shared/api/axios-config.ts";

export class BaseApi<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TBulkDto = { items: TCreateDto[] },
> {
  protected readonly basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async getAll(): Promise<TEntity[]>;
  async getAll(params: Record<string, unknown>): Promise<TEntity[]>;

  async getAll(params?: Record<string, unknown>): Promise<TEntity[]> {
    const { data } = await axiosConfig.get<TEntity[]>(this.basePath, {
      params: params,
    });
    return data;
  }

  async getOne(id: number): Promise<TEntity> {
    const { data } = await axiosConfig.get<TEntity>(`${this.basePath}/${id}`);
    return data;
  }

  async create(dto: TCreateDto): Promise<TEntity> {
    const { data } = await axiosConfig.post<TEntity>(this.basePath, dto);
    return data;
  }

  async createMany(dto: TBulkDto): Promise<TEntity[]> {
    const { data } = await axiosConfig.post<TEntity[]>(
      `${this.basePath}/bulk`,
      dto,
    );
    return data;
  }

  async update(id: number, dto: TUpdateDto): Promise<TEntity> {
    const { data } = await axiosConfig.patch<TEntity>(
      `${this.basePath}/${id}`,
      dto,
    );
    return data;
  }

  // todo возвращать результат
  async delete(id: number): Promise<void> {
    await axiosConfig.delete(`${this.basePath}/${id}`);
  }
}
