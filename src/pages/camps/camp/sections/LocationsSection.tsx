import { useParams } from "react-router-dom";
import { useCampLocations } from "../../hooks/use-camp-locations.hook";
import LocationsTable from "@/pages/camps/camp/components/LocationsTable.tsx";
import CreateLocationsButton from "@/pages/camps/camp/components/CreateLocationsButton.tsx";

export default function LocationsSection() {
  const { campId } = useParams();
  const { locations, refreshCampLocations } = useCampLocations();

  return (
    <div>
      <CreateLocationsButton
        campId={Number(campId)}
        onCreated={refreshCampLocations}
      />
      <LocationsTable campId={Number(campId)} list={locations} />
    </div>
  );
}
