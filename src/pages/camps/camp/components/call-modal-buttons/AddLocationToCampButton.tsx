import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";

import CheckNameTableForm from "@/pages/camps/camp/components/check-tables/CheckNameTableForm.tsx";
import type { CheckFormValues } from "@/pages/camps/camp/components/check-tables/check-form-values.type.ts";
import TabLayout from "@/pages/camps/camp/components/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import { useAllLocations } from "@/pages/camps/hooks/use-all-locations.hook.ts";

interface Props {
  onDone?: (data?: Sportsman[]) => Promise<void> | void;
  campId: number;
}

export default function AddLocationToCampButton(props: Props) {
  const { openModal, closeModal } = useModal();

  const { state } = useAllLocations();

  const handleSubmit = async (values: CheckFormValues) => {
    await LocationApi.addManyToCamp(props.campId, values);
    closeModal();
    props.onDone?.();
  };

  const formId = "addGroupToCampButton";
  const layout = () => (
    <TabLayout>
      <LeftLayoutItem>
        <CheckNameTableForm
          onSubmit={handleSubmit}
          entities={state}
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
      Добавить Локацию
    </Button>
  );
}
