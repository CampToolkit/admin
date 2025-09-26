import GroupsTable from "@/modules/groups/ui/groups-table/GroupsTable.tsx";
import { useParams } from "react-router-dom";
import CreateGroupsButton from "@/modules/groups/ui/CreateGroupsButton.tsx";
import TabHeader from "@/pages/camp/components/TabHeader.tsx";
import { useGroupsInCamp } from "@/pages/camp/hooks/use-groups-in-camp.hook.ts";
import type { Group } from "@/common/api/group/GroupApi.type.ts";
import { useEffect, useState } from "react";
import type { SelectOption } from "@/modules/groups/ui/forms/select-options.type.ts";

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
      <GroupsTable
        list={groups}
        selectOptions={parentGroupSelectOptions}
        onDone={() => refresh(Number(campId))}
      />
    </div>
  );
}
