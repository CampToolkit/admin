import { useParams } from "react-router-dom";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { useAllSportsmen } from "@/pages/camps/hooks/use-all-sportsmen.hook.ts";

import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";

import CheckPersonTableForm from "@/pages/camps/camp/components/check-tables/CheckPersonTable.tsx";
import type { CheckTableFormValues } from "@/pages/camps/camp/components/check-tables/CheckTableFormValues.type.ts";
import TabLayout from "@/pages/camps/camp/components/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

interface Props {
  onDone?: (data?: Sportsman[]) => Promise<void> | void;
}

export default function AddPersonToCampButton(props: Props) {
  const { openModal, closeModal } = useModal();
  const { campId } = useParams();

  const { state: persons } = useAllSportsmen();

  const handleSubmit = async (values: CheckTableFormValues) => {
    await SportsmanApi.addManyToCamp(Number(campId), values);
    closeModal();
    props.onDone?.();
  };

  const formId = "addPersonToCampButton";
  const layout = () => (
    <TabLayout>
      <LeftLayoutItem>
        <CheckPersonTableForm
          onSubmit={handleSubmit}
          persons={persons}
          formId={formId}
        />
      </LeftLayoutItem>
      <RightLayoutItem>
        <FormActions formId={formId} />
      </RightLayoutItem>
    </TabLayout>
  );

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
