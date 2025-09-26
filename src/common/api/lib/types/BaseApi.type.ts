export type NewEntity<T> = Omit<T, "id">;
export type NewNativeCampEntity<T> = Partial<NewEntity<T>> & { campId: number };

export interface EntityApi<T, D> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (dto: D) => Promise<T>;
  createMany: (dto: { items: D[] }) => Promise<T[]>;
  update: (id: number, dto: Partial<D>) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

export interface NativeCampEntityApi<T, D> extends EntityApi<T, D> {
  getByCamp: (campId: number) => Promise<T[]>;
}

export interface RelatedCampEntityApi<T, D> extends NativeCampEntityApi<T, D> {
  addManyToCamp: (id: number, dto: { items: number[] }) => Promise<void>;
  removeManyFromCamp: (id: number, dto: { items: number[] }) => Promise<void>;
}
