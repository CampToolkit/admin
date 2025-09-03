import { useParams } from "react-router-dom";
import { useCampSportsmen } from "@/pages/camps/hooks/use-camp-sportsmen.hook.ts";

import SportsmanTable from "@/pages/camps/camp/components/SportsmanTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";

import AddPersonToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddPersonToCampButton.tsx";

export default function SportsmenSection() {
  const { campId } = useParams();
  const { sportsmen, refreshSportsmen } = useCampSportsmen(Number(campId));

  const onAdd = async () => {
    await refreshSportsmen(Number(campId));
  };

  const onSportsmanTableAction = async () => {
    await refreshSportsmen(Number(campId));
  };

  return (
    <div>
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
