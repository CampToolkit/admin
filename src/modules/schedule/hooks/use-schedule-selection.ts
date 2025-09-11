import { useEffect, useMemo, useState } from "react";
import type { ViewModeType } from "@/modules/schedule/components/Schedule.tsx";

import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCampLocationsByCamp } from "@/pages/camps/hooks/use-camp-locations-by-camp.hook.ts";

import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";

interface Args {
  campId: number;
  initialViewMode: ViewModeType;
}

type MappingViewModeType = Record<
  ViewModeType,
  { list: (Group | CampsLocation)[]; columns: (Group | CampsLocation)[] }
>;

export function useScheduleSelection({ campId, initialViewMode }: Args) {
  const [viewMode, setViewMode] = useState<ViewModeType>(initialViewMode);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { state: groups } = useGroupsInCamp(campId);
  const { state: campLocations } = useCampLocationsByCamp(campId);

  const mapping: MappingViewModeType = {
    byGroup: {
      list: groups,
      columns: campLocations,
    },
    byLocation: {
      list: campLocations,
      columns: groups,
    },
  };

  const { list, columns } = useMemo(() => {
    return mapping[viewMode];
  }, [viewMode, groups, campLocations]);

  useEffect(() => {
    if (list.length > 0) {
      setSelectedId(list[0].id);
    } else {
      setSelectedId(null);
    }
  }, [list]);

  return {
    view: {
      current: viewMode,
      set: setViewMode,
    },
    selection: {
      current: selectedId,
      set: setSelectedId,
      list,
      columns: columns,
    },
  };
}
