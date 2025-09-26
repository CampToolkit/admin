import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";

import FormSwitcherLayout from "@/pages/camp/components/forms-layouts/FormSwitcherLayout.tsx";
import UniversalCheckForm from "@/pages/camp/forms/universal/UniversalCheckForm.tsx";
import UniversalTextFieldForm from "@/pages/camp/forms/universal/UniversalTextFieldForm.tsx";

import type { Person } from "@/common/api/lib/types/Person.type.ts";
import type { UniversalFormValues } from "@/pages/camp/forms/universal/universal-form.type.ts";
import type { CheckFormValues } from "@/pages/camp/forms/universal/check-form.type.ts";
import type {
  NewEntity,
  RelatedCampEntityApi,
} from "@/common/api/lib/types/BaseApi.type.ts";
import { PERSON_FIELDS } from "@/common/components/buttons/consts/person-fields.const.ts";

const ComponentKeys = {
  DB: "database",
  NEW_ITEM: "newItem",
};

interface Props<T, D> {
  buttonText: string;
  onDone?: (data?: T[]) => Promise<void> | void;
  // todo
  api: RelatedCampEntityApi<T, D>;
  useEntity: () => {
    state: T[];
    fetch: () => Promise<void>;
  };
}

export default function AddPersonToCampButton<
  T extends Person,
  D extends Partial<NewEntity<T>>,
>(props: Props<T, D>) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = props.useEntity();
  console.log(persons);

  const addToCamp = async (values: CheckFormValues) => {
    try {
      await props.api.addManyToCamp(Number(campId), values);
      alert("добавили в списко сбора");
      closeModal();
      props.onDone?.();
    } catch (e) {
      // todo добавить обработку ошибок
      console.error(e);
    }
  };

  const createPerson = async (values: UniversalFormValues<D>) => {
    try {
      const newPersons = await props.api.createMany(values);
      alert("добавили в базу данных");
      await addToCamp({ items: newPersons.map((person) => person.id) });
    } catch (e) {
      // todo добавить обработку ошибок
      console.error(e);
    }
  };

  const components = [
    {
      key: ComponentKeys.NEW_ITEM,
      label: "Создать",
      element: (
        <UniversalTextFieldForm<T, D>
          fields={PERSON_FIELDS}
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
          fields={PERSON_FIELDS}
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
      {props.buttonText}
    </Button>
  );
}
