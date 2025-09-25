import type { Entity } from "@/common/api/lib/types/Entity.type.ts";

export interface Person extends Entity {
  lastName: string;
  firstName: string;
  patrName: string;
}
