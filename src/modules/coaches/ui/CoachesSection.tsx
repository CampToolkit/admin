import { Box } from "@mui/material";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useParams } from "react-router-dom";
import PersonEntityTable from "@/pages/camps/camp/components/PersonEntityTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader";
import type { Coach } from "@/shared/api/coach/CoachApi.type.ts";
import { CoachApi } from "@/shared/api/coach/CoachApi.ts";

export default function CoachesSection() {
  const { campId } = useParams();
  const { state: coaches } = useCoach(Number(campId));

  const onRemoveFromCamp = (coachId: number) => {
    return CoachApi.removeManyFromCamp(Number(campId), { items: [coachId] });
  };

  return (
    <Box>
      <TabHeader>tet</TabHeader>

      {coaches && (
        <PersonEntityTable<Coach>
          persons={coaches}
          onRemoveFromCamp={onRemoveFromCamp}
        />
      )}
    </Box>
  );
}
