import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

type Item<T extends Entity> = {
  [K in keyof T]?: string;
};

export interface UniversalFormValues<T extends Entity> {
  items: Item<T>[];
}

export interface Field<T extends Entity> {
  key: keyof T;
  label: string;
}

export interface UniversalFormProps<T extends Entity, V> {
  fields: Field<T>[];
  formId: string;
  onSubmit: (values: V) => Promise<void> | void;
}

/*
*
* type Item<T extends Entity> = {
  [K in keyof T]?: string;
};

export interface UniversalTextFieldFormValues<T extends Entity> {
  items: Item<T>[];
}

interface Field<T extends Entity> {
  key: keyof T;
  label: string;
}

export interface UniversalTextFieldFormProps<T extends Entity> {
  fields: Field<T>[];
  initialValues?: UniversalTextFieldFormValues<T>;
  onSubmit: (values: UniversalTextFieldFormValues<T>) => void;
  formId?: string;
}
*
* */
