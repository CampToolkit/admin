import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import { useLessonModal } from "@/modules/schedule/hooks/use-lesson-modal.tsx";

import { Box } from "@mui/material";
import Schedule, {
  type ViewModeType,
} from "@/modules/schedule/ui/Schedule.tsx";
import CustomSelect from "@/modules/schedule/ui/custom-select/CustomSelect.tsx";

import {
  prepareLessonFormValues,
  type RareLessonFormValues,
} from "@/modules/schedule/utils/prepareLessonFormValues.ts";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";

import { useActivityType } from "@/pages/camps/hooks/use-activity-type.ts";
import { useLessonType } from "@/modules/schedule/hooks/use-lesson-type.ts";

import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useSelectOptions } from "@/modules/schedule/hooks/use-select-options.ts";

const VIEW_OPTIONS: {
  value: ViewModeType;
  label: string;
  currentSelectLabel: string;
}[] = [
  {
    value: "groups",
    label: "Расписание группы",
    currentSelectLabel: "Группа",
  },
  {
    value: "auditorium",
    label: "Расписание локации",
    currentSelectLabel: "Локация",
  },
];

export default function ScheduleSection() {
  const { campId } = useParams();

  const { view, selection } = useScheduleSelection({
    campId: Number(campId),
    initialViewMode: "groups",
  });

  const { open } = useLessonModal({
    campId: Number(campId),
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

  const callLessonModal = (data: RareLessonFormValues) => {
    if (activityTypes.length > 0) {
      data.activityTypeId ??= activityTypes[0].id;
    }

    if (lessonTypes.length > 0) {
      data.lessonTypeId ??= lessonTypes[0].id;
    }

    if (campLocations.length > 0) {
      data.auditoriumId ??= campLocations[0].id;
    }

    const formInitialValues = prepareLessonFormValues(data);
    open({
      options,
      formData: {
        formId: "createAndEditLessonFormId",
        initialValues: formInitialValues,
      },
    });
  };

  return (
    <div>
      <Box
        display="flex"
        gap={2}
        sx={{
          alignItems: "flex-end",
          paddingInline: 2,
          paddingBlockEnd: 2,
        }}
      >
        <CustomSelect<ViewModeType>
          options={VIEW_OPTIONS}
          onChange={(e) => {
            view.set(e.target.value);
          }}
          value={view.current}
          label={"Вид"}
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
      {selection.currentId && (
        <Schedule
          lessons={[
            {
              id: 1,
              campId: 1,
              startDate: "2025-09-10 11:00",
              endDate: "2025-09-10 12:00",
              groups: [
                {
                  id: 2,
                  name: "младшая",
                } as Group,
              ],
              auditorium: { id: 5, name: "лед" },
            } as Lesson,
            {
              id: 2,
              campId: 1,
              startDate: "2025-09-10 12:00",
              endDate: "2025-09-10 13:00",
              groups: [
                {
                  id: 1,
                  name: "старшая",
                } as Group,
              ],
              auditorium: { id: 5, name: "офп" },
            } as Lesson,
            {
              id: 7,
              campId: 1,
              startDate: "2025-09-10 12:30",
              endDate: "2025-09-10 13:30",
              groups: [
                {
                  id: 3,
                  name: "средняя",
                } as Group,
              ],
              auditorium: { id: 5, name: "лед" },
            } as Lesson,
          ]}
          viewMode={view.current}
          selectedId={selection.currentId}
          columns={selection.columns}
          openSessionModal={callLessonModal}
        />
      )}
    </div>
  );
}
