import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import { useLessonModal } from "@/modules/schedule/hooks/use-lesson-modal.tsx";

import { Box } from "@mui/material";
import Schedule, {
  type EntitiesKeyType,
} from "@/modules/schedule/ui/Schedule.tsx";
import CustomSelect from "@/modules/schedule/ui/custom-select/CustomSelect.tsx";

import {
  prepareLessonFormValues,
  type RareLessonFormValues,
} from "@/modules/schedule/utils/prepareLessonFormValues.ts";

import { useActivityType } from "@/pages/camps/hooks/use-activity-type.ts";
import { useLessonType } from "@/modules/schedule/hooks/use-lesson-type.ts";

import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCoach } from "@/pages/camps/hooks/use-coach.ts";
import { useSelectOptions } from "@/modules/schedule/hooks/use-select-options.ts";
import { useLessons } from "@/shared/api/lesson/hooks/use-lessons.ts";

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
  const { campId } = useParams();

  const { state: lessons } = useLessons(Number(campId));

  const { view, selection } = useScheduleSelection({
    campId: Number(campId),
    initialUnionKey: "groups",
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
        <CustomSelect<EntitiesKeyType>
          options={UNION_OPTIONS}
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
          lessons={lessons}
          unionKey={view.current}
          filterKey={selection.filterKey}
          selectedId={selection.currentId}
          columns={selection.columns}
          openSessionModal={callLessonModal}
        />
      )}
    </div>
  );
}
