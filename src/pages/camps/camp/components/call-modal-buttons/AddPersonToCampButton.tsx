import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";

import FormSwitcherLayout from "@/pages/camps/camp/components/forms-layouts/FormSwitcherLayout.tsx";
import UniversalCheckForm from "@/pages/camps/camp/forms/universal/UniversalCheckForm.tsx";
import UniversalTextFieldForm from "@/pages/camps/camp/forms/universal/UniversalTextFieldForm.tsx";

import type { Person } from "@/shared/api/lib/types/Person.type.ts";
import type {
  Field,
  UniversalFormValues,
} from "@/pages/camps/camp/forms/universal/universal-form.type.ts";
import type { CheckFormValues } from "@/pages/camps/camp/forms/universal/check-form.type.ts";
import type { RelatedCampEntityApi } from "@/shared/api/lib/types/BaseApi.type.ts";

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

interface Props<T> {
  onDone?: (data?: T[]) => Promise<void> | void;
  api: RelatedCampEntityApi<T>;
  useEntity: () => {
    state: T[];
    fetch: () => Promise<void>;
  };
}

export default function AddPersonToCampButton<T extends Person>(
  props: Props<T>,
) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = props.useEntity();
  console.log(persons);

  const addToCamp = async (values: CheckFormValues) => {
    try {
      await props.api.addManyToCamp(Number(campId), values);
      alert("добавили спортсменов в список участников сбора");
      closeModal();
      props.onDone?.();
    } catch (e: any) {
      // todo добавить обработку ошибок
      console.error(e);
    }
  };

  const createPerson = async (values: UniversalFormValues<T>) => {
    try {
      const newPersons = await props.api.createMany(values);
      alert("добавили в базу данных");
      await addToCamp({ items: newPersons.map((person) => person.id) });
    } catch (e: any) {
      // todo добавить обработку ошибок
      console.error(e);
    }
  };

  const components = [
    {
      key: ComponentKeys.NEW_ITEM,
      label: "Создать",
      element: (
        <UniversalTextFieldForm<T>
          fields={FIELDS}
          formId={ComponentKeys.NEW_ITEM}
          onSubmit={createPerson}
        />
      ),
    },
    {
      key: ComponentKeys.DB,
      label: "Загрузить из базы данных",
      element: (
        <UniversalCheckForm<T>
          fields={FIELDS}
          onSubmit={addToCamp}
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
