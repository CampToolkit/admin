import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { SportsmanApi } from "@/common/api/sportsman/SportsmanApi.ts";
import PersonBaseForm, {
  type PersonBaseFormValues,
} from "../../shared/components/PersonBaseForm.tsx";
import type { UpdateSportsmanDto } from "@/common/api/sportsman/SportsmanApi.dto.ts";
import type { EditPersonButtonPropsType } from "@/modules/shared/types/edit-person-button-props.type.ts";

export default function EditSportsmanButton(props: EditPersonButtonPropsType) {
  const { initialValues, personId, onDone } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: PersonBaseFormValues) => {
    const dto: UpdateSportsmanDto = {
      lastName: data.lastName,
      firstName: data.firstName,
      patrName: data.patrName,
    };
    await SportsmanApi.update(personId, dto);
    closeModal();
    onDone?.();
  };

  const form = () => (
    <PersonBaseForm onSubmit={onSubmit} initialValues={initialValues} />
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
