import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { EditPersonButtonPropsType } from "@/modules/shared/types/edit-person-button-props.type.ts";
import PersonBaseForm, {
  type PersonBaseFormValues,
} from "@/modules/shared/components/PersonBaseForm.tsx";

import { CoachApi } from "@/shared/api/coach/CoachApi.ts";
import type { UpdateCoachDto } from "@/shared/api/coach/CoachApi.dto.ts";

export default function EditCoachButton(props: EditPersonButtonPropsType) {
  const { personId, initialValues, onDone } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: PersonBaseFormValues) => {
    const dto: UpdateCoachDto = {
      lastName: data.lastName,
      firstName: data.firstName,
      patrName: data.patrName,
    };
    await CoachApi.update(personId, dto);
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
