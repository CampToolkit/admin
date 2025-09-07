import type { NewEntity } from "@/shared/api/lib/types/BaseApi.type.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

export interface Field<T extends Entity> {
  key: keyof NewEntity<T>;
  label: string;
}

export interface UniversalFormProps<T extends Entity, V> {
  fields: Field<T>[];
  formId: string;
  onSubmit: (values: V) => Promise<void> | void;
}

export interface UniversalFormValues<T extends Entity> {
  items: NewEntity<T>[];
}
