import { useEffect, useMemo, useState } from "react";
import type { ViewModeType } from "@/modules/schedule/components/Schedule.tsx";

import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";

interface Args {
  campId: number;
  initialViewMode: ViewModeType;
}

export function useScheduleSelection({ campId, initialViewMode }: Args) {
  const [viewMode, setViewMode] = useState<ViewModeType>(initialViewMode);

  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<number | null>(null);

  const selectedEntity = useMemo(() => {
    return viewMode === "byGroup" ? currentGroup : currentLocation;
  }, [currentGroup, currentLocation, viewMode]);

  const { state: groups } = useGroupsInCamp(campId);
  const { state: campLocations } = useCampLocationsByCamp(campId);

  useEffect(() => {
    if (groups.length > 0) {
      setCurrentGroup(groups[0].id);
    } else {
      setCurrentLocation(null);
    }
  }, [groups]);

  useEffect(() => {
    if (campLocations.length > 0) {
      setCurrentLocation(campLocations[0].id);
    } else {
      setCurrentLocation(null);
    }
  }, [campLocations]);

  return {
    view: {
      mode: viewMode,
      set: setViewMode,
    },
    groups: {
      current: currentGroup,
      list: groups,
      set: setCurrentGroup,
    },
    locations: {
      current: currentLocation,
      list: campLocations,
      set: setCurrentLocation,
    },
    selected: {
      entity: selectedEntity,
    },
  };
}
