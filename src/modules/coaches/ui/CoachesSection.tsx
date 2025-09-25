import { useParams } from "react-router-dom";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";

import { Box } from "@mui/material";
import PersonEntityTable from "@/modules/shared/components/PersonEntityTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader";
import EditCoachButton from "@/modules/coaches/ui/EditCoachButton.tsx";
import AddPersonToCampButton from "@/common/components/buttons/AddPersonToCampButton.tsx";
import { CoachApi } from "@/common/api/coach/CoachApi.ts";
import type { Coach } from "@/common/api/coach/CoachApi.type.ts";

export default function CoachesSection() {
  const { campId } = useParams();
  const { state: coaches, fetch: refreshCoach } = useCoach(Number(campId));

  const onRemoveFromCamp = (coachId: number) => {
    return CoachApi.removeManyFromCamp(Number(campId), { items: [coachId] });
  };

  const onAdd = async () => {
    await refreshCoach();
  };

  return (
    <Box>
      <TabHeader>
        <AddPersonToCampButton<Coach, Coach>
          buttonText="Добавить тренера"
          api={CoachApi}
          onDone={onAdd}
          useEntity={useCoach}
        />
      </TabHeader>

      {coaches && (
        <PersonEntityTable<Coach>
          persons={coaches}
          EditPersonButton={EditCoachButton}
          onRemoveFromCamp={onRemoveFromCamp}
        />
      )}
    </Box>
  );
}
