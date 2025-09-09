import Schedule, {
  type ViewModeType,
} from "@/modules/schedule/components/Schedule.tsx";
import { Box } from "@mui/material";
import CustomSelect from "@/modules/schedule/components/CustomSelect.tsx";
import { useEffect, useState } from "react";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useParams } from "react-router-dom";

const VIEW_OPTIONS: {
  value: ViewModeType;
  label: string;
}[] = [
  {
    value: "byGroup",
    label: "По группам",
  },
  {
    value: "byLocation",
    label: "По локациям",
  },
];

function generateSelectProps<T extends { id: number; name: string }>(
  items: T[],
) {
  return {
    options: items.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  };
}

export default function ScheduleSection() {
  const [viewMode, setViewMode] = useState<ViewModeType>(VIEW_OPTIONS[0].value);
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const { campId } = useParams();
  const { state: groups } = useGroupsInCamp(Number(campId));

  useEffect(() => {
    if (groups.length > 0) {
      setCurrentGroup(groups[0].id);
    }
  }, [groups]);

  return (
    <div>
      <Box display="flex" gap={2}>
        <CustomSelect<ViewModeType>
          options={VIEW_OPTIONS}
          onChange={(e) => {
            setViewMode(e.target.value);
          }}
          value={viewMode}
          label={"Вид"}
        />
        {viewMode === VIEW_OPTIONS[0].value && currentGroup && (
          <>
            <CustomSelect<number>
              options={groups.map((group) => ({
                value: group.id,
                label: group.name,
              }))}
              onChange={(e) => {
                setCurrentGroup(e.target.value);
              }}
              value={currentGroup}
              label={"Группа"}
            />
          </>
        )}
      </Box>
      <Schedule events={[]} viewMode={viewMode} selectedId={5} />
    </div>
  );
}
