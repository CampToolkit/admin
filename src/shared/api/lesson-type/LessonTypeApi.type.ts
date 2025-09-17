import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

// note основная, дополнительная
export interface LessonType extends Entity {
  name: string;
}
