import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";
import type { CheckFormValues } from "@/pages/camps/camp/forms/universal/check-form-values.type.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import { useAllLocations } from "@/pages/camps/hooks/use-all-locations.hook.ts";
import FormSwitcherLayout, {
  type FormSwitcherComponent,
} from "@/pages/camps/camp/components/add-to-camp-modal-layout/FormSwitcherLayout.tsx";
import UniversalCheckForm from "@/pages/camps/camp/forms/universal/UniversalCheckForm.tsx";
import LocationsForm from "@/pages/camps/camp/forms/LocationsForm.tsx";

interface Props {
  onDone?: (data?: Sportsman[]) => Promise<void> | void;
  campId: number;
}

export default function AddLocationToCampButton(props: Props) {
  const { openModal, closeModal } = useModal();

  const { state } = useAllLocations();

  const handleSubmit = async (values: CheckFormValues) => {
    await LocationApi.addManyToCamp(props.campId, values);
    closeModal();
    props.onDone?.();
  };

  const Keys = {
    DB_LOCATIONS: "dbLocations",
    CREATE_LOCATION: "createLocation",
  };

  const components: FormSwitcherComponent[] = [
    {
      key: Keys.CREATE_LOCATION,
      label: "Создать",
      element: <LocationsForm onSubmit={() => {}} />,
    },
    {
      key: Keys.DB_LOCATIONS,
      label: "Загрузить из базы данных",
      element: (
        <UniversalCheckForm
          keys={["name"]}
          entities={state}
          formId={Keys.DB_LOCATIONS}
          onSubmit={handleSubmit}
        />
      ),
    },
  ];

  const layout = () => <FormSwitcherLayout components={components} />;

  const onButtonClick = async () => {
    openModal({
      content: layout,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onButtonClick}
    >
      Добавить Локацию
    </Button>
  );
}
