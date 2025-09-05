import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import type { UniversalFormProps } from "./universal-form";

export interface CheckFormValues {
  items: number[];
}

export interface CheckFormProps<T extends Entity>
  extends UniversalFormProps<T, CheckFormValues> {
  entities: T[];
}
