import { Button } from "@mui/material";

import type { Person } from "@/shared/types/Person.type.ts";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import CheckPersonTableForm, {
  type CheckPersonTableFormValues,
} from "@/pages/camps/camp/components/CheckPersonTable.tsx";
import { useEffect, useState } from "react";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

interface Props<T> {
  onCreated?: (data?: T[]) => Promise<void> | void;
}

export default function AddPersonToCamp<T extends Person>(props: Props<T>) {
  const [persons, setPersons] = useState<T[]>([]);
  const { onCreated = () => {} } = props;

  const { openModal, closeModal } = useModal();

  async function loadPerson() {
    const persons = await SportsmanApi.getAll();
    setPersons(persons as unknown as T[]);
  }

  const handleCreate = async (values: CheckPersonTableFormValues) => {
    console.log(values);
    closeModal();
    onCreated?.();
  };

  const layout = () => (
    <CheckPersonTableForm
      onSubmit={handleCreate}
      persons={persons}
      formId={""}
    />
  );

  const onClickCreate = async () => {
    openModal({
      content: layout,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  useEffect(() => {
    loadPerson();
  });

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onClickCreate}
    >
      Добавить участника
    </Button>
  );
}
