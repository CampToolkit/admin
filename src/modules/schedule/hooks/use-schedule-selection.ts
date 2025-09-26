import { useEffect, useMemo, useState } from "react";
import type { EntitiesKeyType } from "@/modules/schedule/ui/Schedule.tsx";

import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import { useCampLocationsByCamp } from "@/shared/api/location/hooks/use-camp-locations-by-camp.hook.ts";

import type { CampsLocation } from "@/common/api/location/LocationApi.type.ts";
import type { Group } from "@/common/api/group/GroupApi.type.ts";

interface Args {
  campId: number;
  initialUnionKey: EntitiesKeyType;
}

export type ScheduleColumns =
  | {
      type: "campLocation";
      list: CampsLocation[];
    }
  | {
      type: "group";
      list: Group[];
    };

type MappingUnionKeyType = Record<
  EntitiesKeyType,
  | { filterKey: "groups"; list: Group[]; columns: ScheduleColumns }
  | { filterKey: "auditorium"; list: CampsLocation[]; columns: ScheduleColumns }
>;

export function useScheduleSelection({ campId, initialUnionKey }: Args) {
  const [unionKey, setUnionKey] = useState<EntitiesKeyType>(initialUnionKey);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { state: groups } = useGroupsInCamp(campId);
  const { state: campLocations } = useCampLocationsByCamp(campId);

  // todo добавить coach
  const mapping: MappingUnionKeyType = {
    groups: {
      filterKey: "auditorium",
      list: campLocations,
      columns: {
        type: "group",
        list: groups,
      },
    },
    auditorium: {
      filterKey: "groups",
      list: groups,
      columns: {
        type: "campLocation",
        list: campLocations,
      },
    },
  };

  const { filterKey, list, columns } = useMemo(() => {
    return mapping[unionKey];
  }, [unionKey, groups, campLocations]);

  useEffect(() => {
    if (list.length > 0) {
      setSelectedId(list[0].id);
    } else {
      setSelectedId(null);
    }
  }, [list]);

  return {
    view: {
      current: unionKey,
      set: setUnionKey,
    },
    selection: {
      currentId: selectedId,
      set: setSelectedId,
      filterKey,
      list,
      columns: columns,
    },
  };
}
