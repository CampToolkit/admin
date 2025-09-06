export type NewEntity<T> = Omit<T, "id">;
export type NewNativeCampEntity<T> = Partial<NewEntity<T>> & { campId: number };

export interface EntityApi<T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (dto: NewEntity<T>) => Promise<T>;
  createMany: (dto: { items: NewEntity<T>[] }) => Promise<T[]>;
  update: (id: number, dto: Partial<NewEntity<T>>) => Promise<T>;
  delete: (id: number) => Promise<void>;
  [key: string]: any;
}

export interface NativeCampEntityApi<T> extends EntityApi<T> {
  getByCamp: (campId: number) => Promise<T[]>;
}

export interface RelatedCampEntityApi<T> extends NativeCampEntityApi<T> {
  addManyToCamp: (id: number, dto: { items: number[] }) => Promise<void>;
  removeManyFromCamp: (id: number, dto: { items: number[] }) => Promise<void>;
}
