import { useParams } from "react-router-dom";
import { useCampLocations } from "@/shared/api/location/hooks/use-camp-locations.hook.ts";
import LocationsTable from "@/pages/camps/camp/components/LocationsTable.tsx";

import TabHeader from "@/pages/camps/camp/components/TabHeader.tsx";
import AddLocationToCampButton from "@/pages/camps/camp/components/call-modal-buttons/AddLocationToCampButton.tsx";

export default function LocationsSection() {
  const { campId } = useParams();
  const { state, fetch } = useCampLocations(Number(campId));

  return (
    <div>
      <TabHeader>
        <AddLocationToCampButton
          campId={Number(campId)}
          onDone={() => fetch(Number(campId))}
        />
      </TabHeader>
      <LocationsTable
        campId={Number(campId)}
        list={state}
        onDone={() => fetch(Number(campId))}
      />
    </div>
  );
}
