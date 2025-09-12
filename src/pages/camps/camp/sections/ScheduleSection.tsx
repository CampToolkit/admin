import Schedule, {
  type ViewModeType,
} from "@/modules/schedule/components/Schedule.tsx";
import { Box } from "@mui/material";
import CustomSelect from "@/modules/schedule/components/CustomSelect.tsx";
import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type";

import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";

const VIEW_OPTIONS: {
  value: ViewModeType;
  label: string;
  currentSelectLabel: string;
}[] = [
  {
    value: "byGroup",
    label: "Расписание группы",
    currentSelectLabel: "Группа",
  },
  {
    value: "byLocation",
    label: "Расписание локации",
    currentSelectLabel: "Локация",
  },
];

export default function ScheduleSection() {
  const { campId } = useParams();

  const { view, selection } = useScheduleSelection({
    campId: Number(campId),
    initialViewMode: "byGroup",
  });

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
        />
        {selection.current && (
          <CustomSelect<number>
            options={selection.list.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            onChange={(e) => {
              selection.set(e.target.value);
            }}
            value={selection.current}
            label={""}
          />
        )}
      </Box>
      {selection.current && (
        <Schedule<CampsLocation | Group>
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
              auditorium: { id: 2, name: "лед" },
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
              auditorium: { id: 1, name: "офп" },
            } as Lesson,
            {
              id: 7,
              campId: 1,
              startDate: "2025-09-10 12:00",
              endDate: "2025-09-10 13:00",
              groups: [
                {
                  id: 3,
                  name: "средняя",
                } as Group,
              ],
              auditorium: { id: 1, name: "офп" },
            } as Lesson,
          ]}
          viewMode={view.current}
          selectedId={selection.current}
          columns={selection.columns}
        />
      )}
    </div>
  );
}
