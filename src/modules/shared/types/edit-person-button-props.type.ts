import type { PersonBaseFormValues } from "@/modules/shared/components/PersonBaseForm.tsx";

export interface EditPersonButtonPropsType {
  personId: number;
  initialValues: PersonBaseFormValues;
  onDone?: () => Promise<void> | void;
}
