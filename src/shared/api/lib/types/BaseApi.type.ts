type NewEntity<T> = Omit<T, "id">;

export interface EntityApi<T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (dto: NewEntity<T>) => Promise<T>;
  createMany: (dto: { items: NewEntity<T>[] }) => Promise<T[]>;
  update: (id: number, dto: Partial<NewEntity<T>>) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

export interface CampEntityApi<T> extends EntityApi<T> {
  getByCamp: (campId: number) => Promise<T[]>;
  addManyToCamp: (id: number, dto: { items: number[] }) => Promise<void>;
  removeManyFromCamp: (id: number, dto: { items: number[] }) => Promise<void>;
}
