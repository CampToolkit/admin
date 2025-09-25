import type { Entity } from "@/common/api/lib/types/Entity.type.ts";
import type { UniversalFormProps } from "./universal-form.type.ts";

export interface CheckFormValues {
  items: number[];
}

export interface CheckFormProps<T extends Entity>
  extends UniversalFormProps<T, CheckFormValues> {
  entities: T[];
}
