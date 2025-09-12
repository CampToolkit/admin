import { Grid, Paper, Typography, Box } from "@mui/material";
import dayjs, { type Dayjs } from "dayjs";
import { generateTimeSlots } from "@/modules/schedule/utils/generate-time-slots.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type";
import { groupSessionByColumns } from "@/modules/schedule/utils/group-session-by-columns.ts";

export type ViewModeType = "byLocation" | "byGroup";

interface ScheduleProps<T extends Entity> {
  lessons: Lesson[];
  viewMode: ViewModeType;
  selectedId: number;
  columns: T[];
}

const CURRENT_DATE = dayjs();
const SLOT_HEIGHT = 20;
const SLOTS_AMOUNT_IN_HOUR = 4;
const START_HOUR = 7;
export default function Schedule<T extends Entity & { name: string }>({
  lessons,
  viewMode,
  selectedId,
  columns,
}: ScheduleProps<T>) {
  const hourSlots = generateTimeSlots({
    date: CURRENT_DATE,
    startHour: START_HOUR,
    endHour: 21,
    step: {
      value: 1,
      unit: "hour",
    },
  });

  const minuteSlots = generateTimeSlots({
    date: CURRENT_DATE,
    startHour: START_HOUR,
    endHour: 21,
    endMinute: 45,
    step: {
      value: 15,
      unit: "minute",
    },
  });

  const groupedSessions = groupSessionByColumns(lessons, "auditorium");

  function calcLessonPosition(lesson: Lesson) {
    const startDateD = dayjs(lesson.startDate);
    const endDateD = dayjs(lesson.endDate);

    const top = calcTopPosition(startDateD);

    const height =
      (endDateD.hour() - startDateD.hour()) *
      SLOTS_AMOUNT_IN_HOUR *
      SLOT_HEIGHT;
    return {
      top: top,
      height: height,
    };
  }

  function calcTopPosition(time: Dayjs) {
    return (time.hour() - START_HOUR) * SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR;
  }

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
                height: SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR,
                textAlign: "center",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="body2">{calcTopPosition(time)}</Typography>
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
            <Box
              sx={{
                position: "relative",
              }}
            >
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
              {groupedSessions[column.id]?.map((session) => (
                <Box
                  key={session.id}
                  sx={{
                    position: "absolute",
                    ...calcLessonPosition(session),
                    backgroundColor: "primary.light",
                  }}
                >
                  <div>{calcLessonPosition(session).top}</div>
                  {dayjs(session.startDate).format("HH:mm")} -
                  {dayjs(session.endDate).format("HH:mm")}
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
