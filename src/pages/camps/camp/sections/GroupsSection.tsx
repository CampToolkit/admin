import GroupsTable from "@/pages/camps/camp/components/groups-table/GroupsTable.tsx";
import { useParams } from "react-router-dom";
import CreateGroupsButton from "@/pages/camps/camp/components/call-modal-buttons/CreateGroupsButton.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import { useEffect, useRef } from "react";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

export default function GroupsSection() {
  const { campId } = useParams();
  const { state: groups, fetch: refresh } = useGroupsInCamp(Number(campId));
  const rootGroupsRef = useRef<SelectOption[]>([]);

  console.log("groups", groups);

  const filterRootGroups = (groups: Group[]) => {
    return groups.map((group: Group) => ({
      value: group.id,
      name: group.name,
    }));
  };

  useEffect(() => {
    rootGroupsRef.current = filterRootGroups(groups);
  }, [groups]);

  return (
    <div>
      <TabHeader>
        <CreateGroupsButton
          campId={Number(campId)}
          selectOptions={rootGroupsRef.current}
          onCreated={() => refresh(Number(campId))}
        />
      </TabHeader>
      <GroupsTable list={groups} selectOptions={rootGroupsRef.current} />
    </div>
  );
}
