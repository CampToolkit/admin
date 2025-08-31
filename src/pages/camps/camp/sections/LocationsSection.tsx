import { useParams } from "react-router-dom";
import { useCampLocations } from "../../hooks/use-camp-locations.hook";
import LocationsTable from "@/pages/camps/camp/components/LocationsTable.tsx";
import CreateLocationsButton from "@/pages/camps/camp/components/call-modal-buttons/CreateLocationsButton.tsx";
import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";

export default function LocationsSection() {
  const { campId } = useParams();
  const { locations, refreshCampLocations } = useCampLocations();

  return (
    <div>
      <TabHeader>
        <CreateLocationsButton
          campId={Number(campId)}
          onCreated={refreshCampLocations}
        />
      </TabHeader>
      <LocationsTable campId={Number(campId)} list={locations} />
    </div>
  );
}
