import { Grid, Paper, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import { generateTimeSlots } from "@/modules/schedule/utils/generate-time-slots.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  groupId: string;
  locationId: string;
}

export type ViewModeType = "byLocation" | "byGroup";

interface ScheduleProps<T extends Entity> {
  events: Event[];
  viewMode: ViewModeType;
  selectedId: number;
  columns: T[];
}

const CURRENT_DATE = dayjs();
const SLOT_HEIGHT = 20;
export default function Schedule<T extends Entity & { name: string }>({
  events,
  viewMode,
  selectedId,
  columns,
}: ScheduleProps<T>) {
  const hourSlots = generateTimeSlots({
    date: CURRENT_DATE,
    startHour: 7,
    endHour: 21,
    step: {
      value: 1,
      unit: "hour",
    },
  });

  const minuteSlots = generateTimeSlots({
    date: CURRENT_DATE,
    startHour: 7,
    endHour: 21,
    endMinute: 45,
    step: {
      value: 15,
      unit: "minute",
    },
  });

  return (
    <Box sx={{ paddingInline: 2, paddingBlockEnd: 2 }}>
      <Grid container spacing={1}>
        <Grid size={1}>
          <Paper sx={{ p: 1, textAlign: "center", backgroundColor: "#f5f5f5" }}>
            <Typography variant="subtitle1">Time</Typography>
          </Paper>
          {hourSlots.map((time) => (
            <Paper
              key={time.format("HH:mm")}
              sx={{
                p: 1,
                height: SLOT_HEIGHT * 4,
                textAlign: "center",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="body2">{time.format("HH:mm")}</Typography>
            </Paper>
          ))}
        </Grid>

        {columns.map((column, index) => (
          <Grid size={10 / columns.length} key={index}>
            <Paper
              sx={{ p: 1, textAlign: "center", backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="subtitle1">{column.name}</Typography>
            </Paper>
            {minuteSlots.map((time, index) => (
              <Paper
                key={`${column}-${time.format("HH:mm")}`}
                sx={{
                  p: 1,
                  height: SLOT_HEIGHT,
                  borderTop: "1px solid",
                  borderTopColor:
                    time.minute() === 0 && index > 0 ? "#666" : "#e0e0e0",
                  borderRadius: 0,
                }}
              ></Paper>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
