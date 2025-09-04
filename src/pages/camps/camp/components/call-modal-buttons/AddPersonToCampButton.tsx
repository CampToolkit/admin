import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";

import CheckPersonTableForm from "@/pages/camps/camp/components/check-tables/CheckPersonTable.tsx";
import type { CheckTableFormValues } from "@/pages/camps/camp/components/check-tables/CheckTableFormValues.type.ts";

import CheckPersonForm from "@/pages/camps/camp/forms/CheckPersonForm.tsx";
import FormSwitcherLayout from "@/pages/camps/camp/components/add-to-camp-modal-layout/FormSwitcherLayout.tsx";
import type { Person } from "@/shared/api/lib/types/Person.type.ts";

interface Props<T> {
  onDone?: (data?: T[]) => Promise<void> | void;
  useEntity: () => {
    state: T[];
    fetch: () => Promise<void>;
  };
}

const ComponentKeys = {
  DB: "database",
  NEW_ITEM: "newItem",
};

export default function AddPersonToCampButton<T extends Person>(
  props: Props<T>,
) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = props.useEntity();

  const handleSubmit = async (values: CheckTableFormValues) => {
    await SportsmanApi.addManyToCamp(Number(campId), values);
    closeModal();
    props.onDone?.();
  };

  const components = [
    {
      key: ComponentKeys.DB,
      label: "Создать",
      element: (
        <CheckPersonForm
          initialValues={{
            items: [{ lastName: "", firstName: "", patrName: "" }],
          }}
          onSubmit={() => {}}
          formId={ComponentKeys.DB}
        />
      ),
    },
    {
      key: ComponentKeys.NEW_ITEM,
      label: "Загрузить из базы данных",
      element: (
        <CheckPersonTableForm
          onSubmit={handleSubmit}
          persons={persons}
          formId={ComponentKeys.NEW_ITEM}
        />
      ),
    },
  ];

  const layout = () => <FormSwitcherLayout components={components} />;

  const onButtonClick = async () => {
    openModal({
      content: layout,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onButtonClick}
    >
      Добавить участника
    </Button>
  );
}
