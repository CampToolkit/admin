import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import { useEventModal } from "@/modules/schedule/hooks/use-event-modal.tsx";

import { Box, Paper } from "@mui/material";
import Schedule from "@/modules/schedule/ui/Schedule.tsx";
import CustomSelect from "@/modules/schedule/ui/custom-select/CustomSelect.tsx";

import { prepareLessonFormValues } from "@/modules/schedule/utils/prepare-lesson-form-values.ts";

import { useActivityType } from "@/pages/camps/hooks/use-activity-type.ts";
import { useLessonType } from "@/modules/schedule/hooks/use-lesson-type.ts";

import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useSelectOptions } from "@/modules/schedule/hooks/use-select-options.ts";
import { useLessons } from "@/common/api/event/hooks/use-lessons.ts";
import DateNavigator from "@/modules/schedule/ui/DateNavigator.tsx";
import dayjs, { type Dayjs } from "dayjs";
import { useCamp } from "@/pages/camps/hooks/use-camp.ts";
import { useCurrentScheduleDate } from "@/modules/schedule/hooks/use-current-schedule-date.hook.ts";
import type { EntitiesKeyType } from "@/modules/schedule/hooks/distribute-events/use-distribute-events.hook";
import type {
  LessonFormProps,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import { EventApi } from "@/common/api/event/EventApi.ts";
import type { CreateLessonDto } from "@/common/api/event/EventApi.dto.ts";

const UNION_OPTIONS: {
  value: EntitiesKeyType;
  label: string;
  currentSelectLabel: string;
}[] = [
  {
    value: "auditorium",
    label: "Расписание группы",
    currentSelectLabel: "Группа",
  },
  {
    value: "groups",
    label: "Расписание локации",
    currentSelectLabel: "Локация",
  },
];

export default function ScheduleSection() {
  // todo убрать в Context
  const { campId } = useParams();
  const { camp } = useCamp(Number(campId));

  const { currentDate, setCurrentDate } = useCurrentScheduleDate(camp);
  const { state: lessons, fetch: refreshEvents } = useLessons(Number(campId));

  const { view, selection } = useScheduleSelection({
    campId: Number(campId),
    initialUnionKey: "groups",
  });

  const { open, close } = useEventModal();

  const { state: activityTypes } = useActivityType();
  const { state: lessonTypes } = useLessonType();
  const { state: campLocations } = useCampLocationsByCamp(Number(campId));
  const { state: groups } = useGroupsInCamp(Number(campId));
  const { state: coaches } = useCoach(Number(campId));

  const options = useSelectOptions({
    activityTypes,
    lessonTypes,
    campLocations,
    groups,
    coaches,
  });

  // note ПРИ ДОБАВЛЕНИИ ВОЗМОЖНОСТИ НАЗНАЧАТЬ НЕСКОЛЬКО ТРЕНЕРОВ НА EVENT: в values принимать coach[]
  const callEventModal = ({
    values,
    eventId,
  }: {
    values: {
      startDate: Dayjs;
      endDate: Dayjs;
    } & Partial<Omit<LessonFormValues, "startDate" | "endDate">>;
    eventId?: number;
  }) => {
    const handleSubmit: LessonFormProps["onSubmit"] = async (values) => {
      const apiDto: CreateLessonDto = {
        campId: Number(campId),
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        lessonTypeId: values.lessonTypeId,
        activityTypeId: values.activityTypeId,
        auditoriumId: values.auditoriumId,
        coaches:
          values.coachId > 0
            ? [
                {
                  coachId: values.coachId,
                  role: "PRIMARY",
                },
              ]
            : [],
        groupIds: values.groupId > 0 ? [values.groupId] : [],
      };
      if (eventId) {
        await EventApi.update(eventId, apiDto);
      } else {
        await EventApi.create(apiDto);
      }

      await refreshEvents(Number(campId));

      // todo сообщение о сохранении
      close();
    };

    const formInitialValues = prepareLessonFormValues({
      values,
      options: {
        activityTypes,
        lessonTypes,
        campLocations,
      },
    });

    open({
      options,
      formData: {
        formId: "createAndEditLessonFormId",
        initialValues: formInitialValues,
      },
      onSubmit: handleSubmit,
    });
  };

  const onDeleteEvent = async (eventId: number) => {
    // todo сделать подтверждение
    await EventApi.delete(eventId);
    // todo сообщение о удалении
    await refreshEvents(Number(campId));
  };

  return (
    <>
      <Box
        sx={{
          paddingInline: 2,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
            p: 1,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box display="flex" gap={2}>
            <CustomSelect<EntitiesKeyType>
              options={UNION_OPTIONS}
              onChange={(e) => {
                view.set(e.target.value);
              }}
              value={view.current}
              label={""}
              displayEmpty={false}
            />
            {selection.currentId && (
              <CustomSelect<number>
                options={selection.list.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(e) => {
                  selection.set(e.target.value);
                }}
                value={selection.currentId}
                label={""}
              />
            )}
          </Box>
          <DateNavigator
            value={currentDate}
            minValue={dayjs(camp?.startDate)}
            maxValue={dayjs(camp?.endDate)}
            onChange={(value) => {
              if (value) setCurrentDate(value);
            }}
          />
        </Paper>
      </Box>
      {selection.currentId && (
        <Schedule
          currentDate={currentDate}
          lessons={lessons}
          unionKey={view.current}
          filter={{
            key: selection.filterKey,
            value: selection.currentId,
          }}
          columns={selection.columns}
          onOpenEventModal={callEventModal}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </>
  );
}
