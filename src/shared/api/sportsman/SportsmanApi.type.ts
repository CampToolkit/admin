import type { Person } from "@/shared/api/lib/types/Person.type.ts";

export interface Sportsman extends Person {
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}
