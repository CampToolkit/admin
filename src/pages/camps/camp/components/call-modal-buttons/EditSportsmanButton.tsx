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
  onDone?: () => Promise<void> | void;
};

export default function EditSportsmanButton(props: PropsType) {
  const { initialValues, sportsmanId, onDone } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: SportsmanFormValues) => {
    const dto: UpdateSportsmanDto = {
      lastName: data.lastName,
      firstName: data.firstName,
      patrName: data.patrName,
    };
    await SportsmanApi.update(sportsmanId, dto);
    closeModal();
    onDone?.();
  };

  const form = () => (
    <SportsmanForm onSubmit={onSubmit} initialValues={initialValues} />
  );

  const onButtonClick = () => {
    openModal({
      content: form,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <IconButton
      onClick={onButtonClick}
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
