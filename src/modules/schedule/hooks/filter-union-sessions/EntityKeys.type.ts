import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

export type EntityKeys<T> = {
  [K in keyof T]: T[K] extends Entity | Entity[] ? K : never;
}[keyof T];
