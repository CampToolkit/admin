import GroupsTable from "@/pages/camps/camp/components/groups-table/GroupsTable.tsx";
import { useParams } from "react-router-dom";
import CreateGroupsButton from "@/pages/camps/camp/components/call-modal-buttons/CreateGroupsButton.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import { useEffect, useState } from "react";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

export default function GroupsSection() {
  const [parentGroupSelectOptions, setParentGroupSelectOptions] = useState<
    SelectOption[]
  >([]);

  const { campId } = useParams();
  const { state: groups, fetch: refresh } = useGroupsInCamp(Number(campId));

  const createParentGroupSelectOptions = (groups: Group[]) => {
    return groups.map((group: Group) => ({
      value: group.id,
      name: group.name,
    }));
  };

  console.log("GroupsSection", groups);

  useEffect(() => {
    setParentGroupSelectOptions(createParentGroupSelectOptions(groups));
  }, [groups]);

  return (
    <div>
      <TabHeader>
        <CreateGroupsButton
          campId={Number(campId)}
          selectOptions={parentGroupSelectOptions}
          onCreated={() => refresh(Number(campId))}
        />
      </TabHeader>
      <GroupsTable list={groups} selectOptions={parentGroupSelectOptions} />
    </div>
  );
}
