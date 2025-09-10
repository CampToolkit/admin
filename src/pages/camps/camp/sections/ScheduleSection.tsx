import Schedule, {
  type ViewModeType,
} from "@/modules/schedule/components/Schedule.tsx";
import { Box } from "@mui/material";
import CustomSelect from "@/modules/schedule/components/CustomSelect.tsx";
import { useEffect, useState } from "react";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useParams } from "react-router-dom";

import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";

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
  const [viewMode, setViewMode] = useState<ViewModeType>(VIEW_OPTIONS[0].value);
  const { campId } = useParams();
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<number | null>(null);
  const { state: groups } = useGroupsInCamp(Number(campId));
  const { state: campLocations } = useCampLocationsByCamp(Number(campId));

  useEffect(() => {
    if (groups.length > 0) {
      setCurrentGroup(groups[0].id);
    }
  }, [groups]);

  useEffect(() => {
    if (campLocations.length > 0) {
      setCurrentLocation(campLocations[0].id);
    }
  }, [campLocations]);

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
              options={groups.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(e) => {
                setCurrentGroup(e.target.value);
              }}
              value={currentGroup}
              label={"Группа"}
            />
          </>
        )}
        {viewMode === VIEW_OPTIONS[1].value && currentLocation && (
          <>
            <CustomSelect<number>
              options={campLocations.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(e) => {
                setCurrentLocation(e.target.value);
              }}
              value={currentLocation}
              label={"Локация"}
            />
          </>
        )}
      </Box>
      <Schedule events={[]} viewMode={viewMode} selectedId={5} />
    </div>
  );
}
