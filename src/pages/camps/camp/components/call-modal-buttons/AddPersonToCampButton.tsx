import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";

import FormSwitcherLayout from "@/pages/camps/camp/components/forms-layouts/FormSwitcherLayout.tsx";
import UniversalCheckForm from "@/pages/camps/camp/forms/universal/UniversalCheckForm.tsx";
import UniversalTextFieldForm from "@/pages/camps/camp/forms/universal/UniversalTextFieldForm.tsx";

import type { Person } from "@/shared/api/lib/types/Person.type.ts";
import type { Field } from "@/pages/camps/camp/forms/universal/universal-form.ts";
import type { CheckFormValues } from "@/pages/camps/camp/forms/universal/check-form.type.ts";

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

const FIELDS: Field<Person>[] = [
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

export default function AddPersonToCampButton<T extends Person>(
  props: Props<T>,
) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = props.useEntity();
  console.log(persons);

  const handleSubmit = async (values: CheckFormValues) => {
    await SportsmanApi.addManyToCamp(Number(campId), values);
    closeModal();
    props.onDone?.();
  };

  const components = [
    {
      key: ComponentKeys.NEW_ITEM,
      label: "Создать",
      element: (
        <UniversalTextFieldForm<T>
          fields={FIELDS}
          formId={ComponentKeys.NEW_ITEM}
          onSubmit={() => {}}
        />
      ),
    },
    {
      key: ComponentKeys.DB,
      label: "Загрузить из базы данных",
      element: (
        <UniversalCheckForm<T>
          fields={FIELDS}
          onSubmit={handleSubmit}
          entities={persons}
          formId={ComponentKeys.DB}
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
