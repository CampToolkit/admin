import CreateSportsmenButton from "../components/call-modal-buttons/CreateSportsmenButton.tsx";
import { useCampSportsmen } from "@/pages/camps/hooks/use-camp-sportsmen.hook.ts";
import { useParams } from "react-router-dom";
import SportsmanTable from "@/pages/camps/camp/components/SportsmanTable.tsx";

const TEST_SPORTSMEN = [
  {
    id: 1,
    lastName: "Иванов",
    firstName: "Иван",
    patrName: "Иванович",
  },
  {
    id: 2,
    lastName: "Петров",
    firstName: "Петр",
    patrName: "Петрович",
  },
];

const initialValues = {
  form: [
    {
      firstName: "",
      lastName: "",
      patrName: "",
    },
  ],
};

export default function SportsmenSection() {
  const { campId } = useParams();
  const { sportsmen } = useCampSportsmen(Number(campId));
  return (
    <div>
      <CreateSportsmenButton initialValues={initialValues} />
      <SportsmanTable campId={Number(campId)} sportsmen={TEST_SPORTSMEN} />
    </div>
  );
}
