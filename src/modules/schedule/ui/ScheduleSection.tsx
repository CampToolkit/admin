import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import { useEventModal } from "@/modules/schedule/hooks/use-event-modal.tsx";

import { Box, Paper } from "@mui/material";
import Schedule from "@/modules/schedule/ui/Schedule.tsx";
import CustomSelect from "@/modules/schedule/ui/custom-select/CustomSelect.tsx";

import { prepareLessonFormValues } from "@/modules/schedule/utils/prepareLessonFormValues.ts";

import { useActivityType } from "@/pages/camps/hooks/use-activity-type.ts";
import { useLessonType } from "@/modules/schedule/hooks/use-lesson-type.ts";

import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useSelectOptions } from "@/modules/schedule/hooks/use-select-options.ts";
import { useLessons } from "@/shared/api/event/hooks/use-lessons.ts";
import DateNavigator from "@/modules/schedule/ui/DateNavigator.tsx";
import dayjs, { type Dayjs } from "dayjs";
import { useCamp } from "@/pages/camps/hooks/use-camp.ts";
import { useCurrentScheduleDate } from "@/modules/schedule/hooks/use-current-schedule-date.hook.ts";
import type { EntitiesKeyType } from "@/modules/schedule/hooks/distribute-events/use-distribute-events.hook";
import type {
  LessonFormProps,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import { EventApi } from "@/shared/api/event/EventApi.ts";

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

  const { open } = useEventModal({
    campId: Number(campId),
    onClose: () => refreshEvents(Number(campId)),
  });

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

  const handleSubmit: LessonFormProps["onSubmit"] = async (values) => {
    const newEvent = await EventApi.create({
      campId: Number(campId),
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      lessonTypeId: values.lessonTypeId,
      activityTypeId: values.activityTypeId,
      auditoriumId: values.auditoriumId,
    });

    if (newEvent && values.coachId) {
      await EventApi.appointCoach({
        lessonId: newEvent.id,
        coachId: values.coachId,
        role: "PRIMARY",
      });
    }

    if (newEvent && values.groupId) {
      await EventApi.addGroup({
        lessonId: newEvent.id,
        groupId: values.groupId,
      });
    }
    // todo сообщение о успешном создании event
  };

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
    if (eventId) {
      console.log("eventId", eventId);
    }

    if (activityTypes.length > 0) {
      values.activityTypeId ??= activityTypes[0].id;
    }

    if (lessonTypes.length > 0) {
      values.lessonTypeId ??= lessonTypes[0].id;
    }

    if (campLocations.length > 0) {
      values.auditoriumId ??= campLocations[0].id;
    }

    const formInitialValues = prepareLessonFormValues(values);
    open({
      options,
      formData: {
        formId: "createAndEditLessonFormId",
        initialValues: formInitialValues,
      },
      onSubmit: handleSubmit,
    });
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
        />
      )}
    </>
  );
}
