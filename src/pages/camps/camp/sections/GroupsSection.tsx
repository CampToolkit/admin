import GroupsTable from "@/pages/camps/camp/components/GroupsTable.tsx";
import { useParams } from "react-router-dom";
import CreateGroupsButton from "@/pages/camps/camp/components/call-modal-buttons/CreateGroupsButton.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import { useGroupsInCamp } from "@/pages/camps/hooks/use-groups-in-camp.hook.ts";

// const GROUP_LIST_TEST = [
//   {
//     id: 1,
//     name: "old",
//     parentId: 1,
//   },
//   {
//     id: 2,
//     name: "new",
//     parentId: null,
//   },
// ];

export default function GroupsSection() {
  const { campId } = useParams();
  const { state: groups, fetch: refresh } = useGroupsInCamp(Number(campId));

  return (
    <div>
      <TabHeader>
        <CreateGroupsButton
          campId={Number(campId)}
          onCreated={() => refresh(Number(campId))}
        />
      </TabHeader>
      <GroupsTable campId={Number(campId)} list={groups} />
    </div>
  );
}
