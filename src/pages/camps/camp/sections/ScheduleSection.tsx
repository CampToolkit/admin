import Schedule, {
  type ViewModeType,
} from "@/modules/schedule/components/Schedule.tsx";
import { Box } from "@mui/material";
import CustomSelect from "@/modules/schedule/components/CustomSelect.tsx";
import { useParams } from "react-router-dom";

import { useScheduleSelection } from "@/modules/schedule/hooks/use-schedule-selection.ts";

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
        <Schedule
          events={[]}
          viewMode={view.current}
          selectedId={selection.current}
        />
      )}
    </div>
  );
}
