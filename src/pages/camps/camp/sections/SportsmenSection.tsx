import CreateSportsmenButton from "../components/call-modal-buttons/CreateSportsmenButton.tsx";
import { useCampSportsmen } from "@/pages/camps/hooks/use-camp-sportsmen.hook.ts";
import { useParams } from "react-router-dom";
import SportsmanTable from "@/pages/camps/camp/components/SportsmanTable.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";

// const TEST_SPORTSMEN = [
//   {
//     id: 1,
//     lastName: "Иванов",
//     firstName: "Иван",
//     patrName: "Иванович",
//   },
//   {
//     id: 2,
//     lastName: "Петров",
//     firstName: "Петр",
//     patrName: "Петрович",
//   },
// ];

export default function SportsmenSection() {
  const { campId } = useParams();
  const { sportsmen, refreshSportsmen } = useCampSportsmen(Number(campId));

  const onCreated = async (data: Sportsman[] | undefined) => {
    console.log("Creating Sportsmen", data);
    if (!data) return;

    await SportsmanApi.addManyToCamp(Number(campId), {
      items: data.map((sportsman) => sportsman.id),
    });
    await refreshSportsmen(Number(campId));
  };

  return (
    <div>
      <TabHeader>
        <CreateSportsmenButton onCreated={onCreated} />
      </TabHeader>
      <SportsmanTable campId={Number(campId)} sportsmen={sportsmen} />
    </div>
  );
}
