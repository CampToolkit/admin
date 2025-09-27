import { Button } from "@mui/material";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

export default function ShowSportsmanListButton() {
  const { openModal } = useModal();

  const sportsmen = [];

  return <Button>Список спортсменов</Button>;
}
