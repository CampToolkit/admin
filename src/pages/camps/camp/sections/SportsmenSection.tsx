import { useParams } from "react-router-dom";
import { useCampSportsmen } from "@/pages/camps/hooks/use-camp-sportsmen.hook.ts";

import SportsmanTable from "@/pages/camps/camp/components/SportsmanTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";

import AddPersonToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddPersonToCampButton.tsx";
import { Button } from "@mui/material";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import AddToCampLayout from "@/pages/camps/camp/components/add-to-camp-modal-layout/AddToCampLayout.tsx";

export default function SportsmenSection() {
  const { campId } = useParams();
  const { sportsmen, refreshSportsmen } = useCampSportsmen(Number(campId));

  const { openModal } = useModal();

  const onAdd = async () => {
    await refreshSportsmen(Number(campId));
  };

  const onSportsmanTableAction = async () => {
    await refreshSportsmen(Number(campId));
  };

  const layout = () => <AddToCampLayout />;

  const clickTest = () => {
    openModal({
      content: layout,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <div>
      <Button onClick={clickTest}>addTest</Button>
      <TabHeader>
        <AddPersonToCampButton onDone={onAdd} />
      </TabHeader>
      <SportsmanTable
        campId={Number(campId)}
        sportsmen={sportsmen}
        onDone={onSportsmanTableAction}
      />
    </div>
  );
}
