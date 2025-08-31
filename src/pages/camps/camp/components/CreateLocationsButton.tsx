import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";
import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import type { CreateLocationDto } from "@/shared/api/location/LocationApi.dto.ts";
import LocationsForm, {
  type LocationsFormValues,
} from "@/pages/camps/camp/forms/LocationsForm.tsx";

interface Props {
  campId: number;
  onCreated?: () => void;
}

export default function CreateLocationsButton(props: Props) {
  const { onCreated = () => {}, campId } = props;

  const { openModal, closeModal } = useModal();

  const onSubmit = async (values: LocationsFormValues) => {
    const dto: CreateLocationDto = {
      campId,
      name: values.locations[0].name,
    };

    await LocationApi.create(dto);
    closeModal();
    onCreated();
  };

  const form = () => <LocationsForm onSubmit={onSubmit} />;

  const onClickCreate = async () => {
    openModal({
      content: form,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onClickCreate}
    >
      Добавить новое помещение
    </Button>
  );
}
