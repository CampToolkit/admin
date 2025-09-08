import Schedule from "../schedule/Schedule";
import { useParams } from "react-router-dom";

import { useCamp } from "@/pages/camps/hooks/use-camp.ts";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export default function ScheduleSection() {
  const { campId } = useParams();
  const { camp } = useCamp(Number(campId));
  return (
    <Box sx={{ border: "1px solid red", height: "100%", minHeight: "100%" }}>
      {camp && (
        <Schedule
          startDate={dayjs(camp.startDate)}
          endDate={dayjs(camp.endDate)}
        />
      )}
    </Box>
  );
}
