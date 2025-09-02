import type { Person } from "@/shared/types/Person.type.ts";

export interface Sportsman extends Person {
  id: number;
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}
