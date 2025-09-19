import { type MouseEvent } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Grid, Paper, Typography, Box } from "@mui/material";

import EventCard from "@/modules/schedule/ui/EventCard.tsx";

import {
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
  START_HOUR,
} from "../constants/time-table.const.ts";
import { calcLessonPosition } from "@/modules/schedule/utils/calc-lesson-position.ts";

import { generateTimeSlots } from "@/modules/schedule/utils/generate-time-slots.ts";

import type { ScheduleColumns } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import type { Event } from "@/shared/api/event/EventApi.type.ts";
import type { LessonFormValues } from "./lesson-form/lesson-form.type.ts";
import { useDistributeEvents } from "@/modules/schedule/hooks/distribute-events/use-distribute-events.hook.ts";
import SchedulePositionWrapper from "@/modules/schedule/ui/SchedulePositionWrapper.tsx";
import type { SxProps, Theme } from "@mui/system";

// todo добавить coach
export type EntitiesKeyType = keyof Pick<Event, "auditorium" | "groups">;

interface ScheduleProps {
  currentDate: Dayjs;
  lessons: Event[];
  unionKey: EntitiesKeyType;
  filter: {
    key: EntitiesKeyType;
    value: number;
  };
  columns: ScheduleColumns;
  onCreateEvent: (
    value: {
      startDate: Dayjs;
      endDate: Dayjs;
    } & Partial<Omit<LessonFormValues, "startDate" | "endDate">>,
  ) => void;
}

export default function Schedule({
  currentDate,
  lessons,
  unionKey,
  filter,
  columns,
  onCreateEvent,
}: ScheduleProps) {
  const distributedEvents = useDistributeEvents({
    list: lessons,
    unionKey,
    filter,
  });

  const hourSlots = generateTimeSlots({
    date: currentDate,
    startHour: START_HOUR,
    endHour: 21,
    step: {
      value: 1,
      unit: "hour",
    },
  });

  const minuteSlots = generateTimeSlots({
    date: currentDate,
    startHour: START_HOUR,
    endHour: 21,
    endMinute: 45,
    step: {
      value: 15,
      unit: "minute",
    },
  });

  const tableTitleStyles: SxProps<Theme> = {
    p: 1,
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  };

  const createEvent = (e: MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).closest(
      ".js-time-slot",
    ) as HTMLDivElement;

    if (!target) return;

    const startDate = dayjs(target.dataset.slotTime);

    const tableEntityType = target.dataset.tableEntityType
      ? target.dataset.tableEntityType
      : "";
    const tableEntityId = target.dataset.tableEntityId;

    const columnEntityType = target.dataset.columnEntityType
      ? target.dataset.columnEntityType
      : "";
    const columnEntityId = target.dataset.columnEntityId;

    onCreateEvent({
      [`${tableEntityType}Id`]: tableEntityId,
      [`${columnEntityType}Id`]: columnEntityId,
      startDate: startDate,
      endDate: startDate.add(1, "hour"),
    });
  };

  return (
    <Box sx={{ paddingInline: 2, paddingBlockEnd: 2 }}>
      <Grid container spacing={1}>
        <Grid size={1}>
          <Paper sx={tableTitleStyles}>
            <Typography variant="subtitle1">время</Typography>
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
          <Grid size={11 / columns.list.length} key={index}>
            <Paper sx={tableTitleStyles}>
              <Typography variant="subtitle1">
                {column.name.toLowerCase()}
              </Typography>
            </Paper>
            <Box
              sx={{
                position: "relative",
              }}
              onClick={createEvent}
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
                  className="js-time-slot"
                  data-slot-time={time.toISOString()}
                  data-column-entity-type={columns.type}
                  data-column-entity-id={column.id}
                  data-table-entity-type={filter.key}
                  data-table-entity-id={filter.value}
                ></Paper>
              ))}
              {distributedEvents[column.id]?.map((events) => (
                <>
                  {events.map((event, index) => (
                    <SchedulePositionWrapper
                      key={event.id}
                      position={calcLessonPosition({
                        event,
                        eventIndex: index,
                        overlapEventsAmount: events.length,
                      })}
                    >
                      <EventCard
                        startDate={dayjs(event.startDate)}
                        groupName={event.groups
                          .map((item) => item.name)
                          .join(", ")}
                        coachName={event.coaches
                          .map((item) => item.lastName)
                          .join(", ")}
                        campLocationName={event.auditorium.name}
                      />
                    </SchedulePositionWrapper>
                  ))}
                </>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
