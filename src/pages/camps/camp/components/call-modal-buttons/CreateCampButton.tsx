import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { CampApi } from "@/shared/api/camp/CampApi.ts";
import dayjs from "dayjs";

import { Button } from "@mui/material";

import BaseInfoForm, {
  type BaseInfoFormValues,
} from "@/pages/camps/camp/forms/BaseInfoForm.tsx";

import type { CreateCampDto } from "@/shared/api/camp/CampApi.dto.ts";

const initialValues = {
  name: "",
  startDate: dayjs(),
  endDate: dayjs(),
  city: "",
};

type NewCampPropsType = {
  onCampCreated?: () => void;
};

export default function CreateCampButton(props: NewCampPropsType) {
  const { onCampCreated = () => {} } = props;
  const { openModal, closeModal } = useModal();

  const handleCreate = async (values: BaseInfoFormValues) => {
    const dto: CreateCampDto = {
      name: values.name,
      city: values.city,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };
    await CampApi.create(dto);
    closeModal();
    onCampCreated();
  };

  const newCamp = () => (
    <BaseInfoForm onSubmit={handleCreate} initialValues={initialValues} />
  );

  const onClickCreateCamp = async () => {
    openModal({
      content: newCamp,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onClickCreateCamp}
    >
      Новый сбор
    </Button>
  );
}
