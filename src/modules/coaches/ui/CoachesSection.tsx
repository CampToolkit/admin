import { Box } from "@mui/material";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useParams } from "react-router-dom";

export default function CoachesSection() {
  const { campId } = useParams();
  const { fetch: coaches } = useCoach(Number(campId));

  return (
    <Box>
      <div>coaches</div>
    </Box>
  );
}
