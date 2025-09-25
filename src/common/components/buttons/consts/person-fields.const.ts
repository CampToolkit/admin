import type { Field } from "@/pages/camps/camp/forms/universal/universal-form.type.ts";
import type { Person } from "@/common/api/lib/types/Person.type.ts";

export const PERSON_FIELDS: Field<Person>[] = [
  {
    key: "lastName",
    label: "Фамилия",
  },
  {
    key: "firstName",
    label: "Имя",
  },
  {
    key: "patrName",
    label: "Отчество",
  },
];
