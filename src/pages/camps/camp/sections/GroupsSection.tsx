import GroupsTable from "@/pages/camps/camp/components/GroupsTable.tsx";
import { useParams } from "react-router-dom";
import CreateGroupsButton from "@/pages/camps/camp/components/call-modal-buttons/CreateGroupsButton.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";

const GROUP_LIST_TEST = [
  {
    id: 1,
    name: "old",
    parentId: 1,
  },
  {
    id: 2,
    name: "new",
    parentId: null,
  },
];

export default function GroupsSection() {
  const { campId } = useParams();

  return (
    <div>
      <TabHeader>
        <CreateGroupsButton campId={Number(campId)} />
      </TabHeader>
      <GroupsTable campId={Number(campId)} list={GROUP_LIST_TEST} />
    </div>
  );
}
