import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import LocationForm, {
  type LocationFormValues,
} from "@/pages/camps/camp/forms/LocationForm.tsx";
import type { UpdateLocationDto } from "@/shared/api/location/LocationApi.dto.ts";

interface Props {
  itemId: number;
  initialValues: LocationFormValues;
}

export default function EditLocationButton(props: Props) {
  const { initialValues, itemId } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: LocationFormValues) => {
    const dto: UpdateLocationDto = {
      name: data.name,
    };
    await LocationApi.update(itemId, dto);
    closeModal();
  };

  const form = () => (
    <LocationForm onSubmit={onSubmit} initialValues={initialValues} />
  );

  const onClick = () => {
    openModal({
      content: form,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.light",
        },
      }}
    >
      <EditIcon />
    </IconButton>
  );
}
