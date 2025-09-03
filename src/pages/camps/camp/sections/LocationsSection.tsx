import { useParams } from "react-router-dom";
import { useCampLocations } from "../../hooks/use-camp-locations.hook";
import LocationsTable from "@/pages/camps/camp/components/LocationsTable.tsx";

import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import AddLocationToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddLocationToCampButton.tsx";

export default function LocationsSection() {
  const { campId } = useParams();
  const { locations, refreshCampLocations } = useCampLocations();

  return (
    <div>
      <TabHeader>
        <AddLocationToCampButton
          campId={Number(campId)}
          onDone={refreshCampLocations}
        />
      </TabHeader>
      <LocationsTable campId={Number(campId)} list={locations} />
    </div>
  );
}
