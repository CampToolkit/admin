import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";
import SportsmanForm, {
  type SportsmanFormValues,
} from "../../forms/SportsmanForm.tsx";
import type { UpdateSportsmanDto } from "@/shared/api/sportsman/SportsmanApi.dto.ts";

type PropsType = {
  sportsmanId: number;
  initialValues: SportsmanFormValues;
};

export default function EditSportsmanButton(props: PropsType) {
  const { initialValues, sportsmanId } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: SportsmanFormValues) => {
    const dto: UpdateSportsmanDto = {
      lastName: data.lastName,
      firstName: data.firstName,
      patrName: data.patrName,
    };
    await SportsmanApi.update(sportsmanId, dto);
    closeModal();
  };

  const form = () => (
    <SportsmanForm onSubmit={onSubmit} initialValues={initialValues} />
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
