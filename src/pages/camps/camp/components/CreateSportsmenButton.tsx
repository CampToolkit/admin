import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";
import SportsmenForm, {
  type SportsmenFormValues,
} from "@/pages/camps/camp/forms/SportsmenForm.tsx";

import type { CreateSportsmanDto } from "@/shared/api/sportsman/SportsmanApi.dto.ts";

type NewCampPropsType = {
  onSportsmanCreated?: () => void;
  initialValues: SportsmenFormValues;
};

export default function CreateCampButton(props: NewCampPropsType) {
  const { onSportsmanCreated = () => {}, initialValues } = props;
  console.log(initialValues, "CreateCampButton");
  const { openModal, closeModal } = useModal();

  const handleCreate = async (values: SportsmenFormValues) => {
    const dto: CreateSportsmanDto = {
      lastName: values.sportsmen[0].lastName,
      firstName: values.sportsmen[0].firstName,
      patrName: values.sportsmen[0].patrName,
    };
    await SportsmanApi.create(dto);
    closeModal();
    onSportsmanCreated();
  };

  const sportsmen = () => (
    <SportsmenForm onSubmit={handleCreate} initialValues={initialValues} />
  );

  const onClickCreate = async () => {
    openModal({
      content: sportsmen,
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
      Добавить нового спортсмена
    </Button>
  );
}
