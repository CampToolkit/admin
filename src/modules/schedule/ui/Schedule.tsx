import type { MouseEvent } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Grid, Paper, Typography, Box } from "@mui/material";

import LessonCard from "@/modules/schedule/ui/LessonCard.tsx";
import { groupSessionByColumns } from "@/modules/schedule/utils/group-session-by-columns.ts";

import {
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
  START_HOUR,
} from "../constants/time-table.const.ts";
import { calcLessonPosition } from "@/modules/schedule/utils/calc-lesson-position.ts";

import { generateTimeSlots } from "@/modules/schedule/utils/generate-time-slots.ts";

import type { ScheduleColumns } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import type { LessonFormValues } from "./lesson-form/lesson-form.type.ts";

export type ViewModeType = keyof Pick<
  Lesson,
  "auditorium" | "groups" | "coach"
>;

interface ScheduleProps {
  lessons: Lesson[];
  viewMode: ViewModeType;
  selectedId: number;
  columns: ScheduleColumns;
  openSessionModal: (
    value: {
      startDate: Dayjs;
      endDate: Dayjs;
    } & Partial<Omit<LessonFormValues, "startDate" | "endDate">>,
  ) => void;
}

const CURRENT_DATE = dayjs();

export default function Schedule({
  lessons,
  viewMode,
  selectedId,
  columns,
  openSessionModal,
}: ScheduleProps) {
  const groupedSessions = groupSessionByColumns(lessons, viewMode);
  console.log(lessons);

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

  const createSession = (e: MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).closest(
      "[data-slot-time]",
    ) as HTMLDivElement;

    if (!target) return;

    const startDate = dayjs(target.dataset.slotTime);
    openSessionModal({
      startDate: startDate,
      endDate: startDate.add(1, "hour"),
    });
  };

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
              <Typography variant="body2">{time.format("HH:mm")}</Typography>
            </Paper>
          ))}
        </Grid>

        {columns.list.map((column, index) => (
          <Grid size={10 / columns.list.length} key={index}>
            <Paper
              sx={{ p: 1, textAlign: "center", backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="subtitle1">{column.name}</Typography>
            </Paper>
            <Box
              sx={{
                position: "relative",
              }}
              onClick={createSession}
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
                    cursor: "pointer",
                  }}
                  data-slot-time={time.toISOString()}
                  data-entity-type={columns.type}
                  data-entity-id={column.id}
                ></Paper>
              ))}
              {groupedSessions[column.id]?.map((session) => (
                <LessonCard
                  key={session.id}
                  startDate={dayjs(session.startDate)}
                  groupName={session.groups.map((item) => item.name).join(", ")}
                  coachName={"coach"}
                  campLocationName={"лед"}
                  position={calcLessonPosition(session)}
                />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
