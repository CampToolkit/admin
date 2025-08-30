import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { Button } from "@mui/material";

export default function NewCamp() {
  const { openModal } = useModal();
  const newCamp = () => <div></div>;

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
