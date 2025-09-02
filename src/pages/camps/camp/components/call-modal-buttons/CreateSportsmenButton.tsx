import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

import { Button } from "@mui/material";
import SportsmenForm, {
  type SportsmenFormValues,
} from "@/pages/camps/camp/forms/SportsmenForm.tsx";

import type { CreateSportsmanBulkDto } from "@/shared/api/sportsman/SportsmanApi.dto.ts";
import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

const INITIAL_VALUES = {
  items: [
    {
      firstName: "",
      lastName: "",
      patrName: "",
    },
  ],
};

interface Props {
  onCreated?: (data?: Sportsman[]) => Promise<void> | void;
}

export default function CreateCampButton(props: Props) {
  const { onCreated = () => {} } = props;

  const { openModal, closeModal } = useModal();

  const handleCreate = async (values: SportsmenFormValues) => {
    const dto: CreateSportsmanBulkDto = {
      items: values.items.map((item) => ({
        ...item,
      })),
    };
    const created = await SportsmanApi.createMany(dto);
    await onCreated?.(created);
    closeModal();
  };

  const sportsmen = () => (
    <SportsmenForm onSubmit={handleCreate} initialValues={INITIAL_VALUES} />
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
