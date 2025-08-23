import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { Button } from "@mui/material";
import CampForm from "../camp/CampForm";

export default function NewCamp() {
  const { openModal } = useModal();
  const newCamp = () => <CampForm />;

  const onClickCreateCamp = async () => {
    openModal({
      content: newCamp,
      showConfirmButton: true,
      showCancelButton: true,
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
