import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { useAllSportsmen } from "@/pages/camps/hooks/use-all-sportsmen.hook.ts";

import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";

import CheckPersonTableForm from "@/pages/camps/camp/components/check-tables/CheckPersonTable.tsx";
import type { CheckTableFormValues } from "@/pages/camps/camp/components/check-tables/CheckTableFormValues.type.ts";

import NewSportsmenForm from "@/pages/camps/camp/components/add-to-camp-modal-layout/NewSportsmenFormTest.tsx";
import FormSwitcherLayout from "@/pages/camps/camp/components/add-to-camp-modal-layout/FormSwitcherLayout.tsx";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

interface Props {
  onDone?: (data?: Sportsman[]) => Promise<void> | void;
}

const ComponentKeys = {
  DB: "database",
  NEW_ITEM: "newItem",
};

export default function AddPersonToCampButton(props: Props) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = useAllSportsmen();

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
        <NewSportsmenForm
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
