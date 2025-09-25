import { useParams } from "react-router-dom";
import { useCampSportsmen } from "@/pages/camps/hooks/use-camp-sportsmen.hook.ts";

import PersonEntityTable from "@/modules/shared/components/PersonEntityTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";

import AddPersonToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddPersonToCampButton.tsx";
import { useAllSportsmen } from "@/pages/camps/hooks/use-all-sportsmen.hook.ts";
import type { Sportsman } from "@/common/api/sportsman/SportsmanApi.type.ts";
import { SportsmanApi } from "@/common/api/sportsman/SportsmanApi.ts";
import EditSportsmanButton from "@/modules/sportsmen/ui/EditSportsmanButton.tsx";

export default function SportsmenSection() {
  const { campId } = useParams();
  const { state: sportsmen, fetch: refreshSportsmen } = useCampSportsmen(
    Number(campId),
  );

  const onRemoveFromCamp = async (sportsmanId: number) => {
    await SportsmanApi.removeManyFromCamp(Number(campId), {
      items: [sportsmanId],
    });
  };

  const onAdd = async () => {
    await refreshSportsmen(Number(campId));
  };

  const onSportsmanTableAction = async () => {
    await refreshSportsmen(Number(campId));
  };

  return (
    <div>
      <TabHeader>
        <AddPersonToCampButton<Sportsman, Sportsman>
          buttonText="Добавить участника"
          api={SportsmanApi}
          onDone={onAdd}
          useEntity={useAllSportsmen}
        />
      </TabHeader>

      <PersonEntityTable
        persons={sportsmen}
        onRemoveFromCamp={onRemoveFromCamp}
        EditPersonButton={EditSportsmanButton}
        onDone={onSportsmanTableAction}
      />
    </div>
  );
}
