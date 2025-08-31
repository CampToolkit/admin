import GroupsTable from "@/pages/camps/camp/components/GroupsTable.tsx";
import { useParams } from "react-router-dom";

const GROUP_LIST_TEST = [
  {
    id: 1,
    name: "old",
  },
  {
    id: 2,
    name: "new",
  },
];

export default function GroupsSection() {
  const { campId } = useParams();

  return <GroupsTable campId={Number(campId)} list={GROUP_LIST_TEST} />;
}
