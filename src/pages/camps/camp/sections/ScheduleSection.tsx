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
}[] = [
  {
    value: "byGroup",
    label: "Расписание группы",
  },
  {
    value: "byLocation",
    label: "Расписание локации",
  },
];

export default function ScheduleSection() {
  const { campId } = useParams();

  const { view, groups, locations } = useScheduleSelection({
    campId: Number(campId),
    initialViewMode: "byGroup",
  });

  return (
    <div>
      <Box display="flex" gap={2}>
        <CustomSelect<ViewModeType>
          options={VIEW_OPTIONS}
          onChange={(e) => {
            view.set(e.target.value);
          }}
          value={view.mode}
          label={"Вид"}
        />
        {view.mode === VIEW_OPTIONS[0].value && groups.current && (
          <>
            <CustomSelect<number>
              options={groups.list.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(e) => {
                groups.set(e.target.value);
              }}
              value={groups.current}
              label={"Группа"}
            />
          </>
        )}
        {view.mode === VIEW_OPTIONS[1].value && locations.current && (
          <>
            <CustomSelect<number>
              options={locations.list.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(e) => {
                locations.set(e.target.value);
              }}
              value={locations.current}
              label={"Локация"}
            />
          </>
        )}
      </Box>
      <Schedule events={[]} viewMode={view.mode} selectedId={5} />
    </div>
  );
}
