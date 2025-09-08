import { useParams } from "react-router-dom";
import LocationsTable from "@/pages/camps/camp/components/LocationsTable.tsx";

import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import AddLocationToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddLocationToCampButton.tsx";
import { useAllLocations } from "@/pages/camps/hooks/use-all-locations.hook.ts";

export default function LocationsSection() {
  const { campId } = useParams();
  const { state: locations, fetch: refreshLocations } = useAllLocations();

  return (
    <div>
      <TabHeader>
        <AddLocationToCampButton
          campId={Number(campId)}
          onDone={refreshLocations}
        />
      </TabHeader>
      <LocationsTable
        campId={Number(campId)}
        list={locations}
        onDone={refreshLocations}
      />
    </div>
  );
}
