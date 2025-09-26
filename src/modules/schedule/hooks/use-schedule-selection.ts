import { useEffect, useMemo, useState } from "react";

import { useGroupsInCamp } from "@/pages/camp/hooks/use-groups-in-camp.hook.ts";
import { useCampLocationsByCamp } from "@/common/api/location/hooks/use-camp-locations-by-camp.hook.ts";

import type { Auditorium } from "@/common/api/location/LocationApi.type.ts";
import type { Group } from "@/common/api/group/GroupApi.type.ts";
import type { EntitiesKeyType } from "./distribute-events/use-distribute-events.hook";

interface Args {
  campId: number;
  initialUnionKey: EntitiesKeyType;
}

export type ScheduleColumns =
  | {
      type: "auditorium";
      list: Auditorium[];
    }
  | {
      type: "group";
      list: Group[];
    };

type MappingUnionKeyType = Record<
  EntitiesKeyType,
  | {
      filterKey: "groups";
      filterType: "group";
      list: Group[];
      columns: ScheduleColumns;
    }
  | {
      filterKey: "auditorium";
      filterType: "auditorium";
      list: Auditorium[];
      columns: ScheduleColumns;
    }
>;

export function useScheduleSelection({ campId, initialUnionKey }: Args) {
  const [unionKey, setUnionKey] = useState<EntitiesKeyType>(initialUnionKey);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { state: groups } = useGroupsInCamp(campId);
  const { state: auditoriums } = useCampLocationsByCamp(campId);

  // todo добавить coach
  const mapping: MappingUnionKeyType = {
    groups: {
      filterKey: "auditorium",
      filterType: "auditorium",
      list: auditoriums,
      columns: {
        type: "group",
        list: groups,
      },
    },
    auditorium: {
      filterKey: "groups",
      filterType: "group",
      list: groups,
      columns: {
        type: "auditorium",
        list: auditoriums,
      },
    },
  };

  const { filterKey, filterType, list, columns } = useMemo(() => {
    return mapping[unionKey];
  }, [unionKey, groups, auditoriums]);

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
      filterType,
      list,
      columns: columns,
    },
  };
}
