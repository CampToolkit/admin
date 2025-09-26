import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";
import type { CheckFormValues } from "@/pages/camps/camp/forms/universal/check-form.type.ts";

import type { Sportsman } from "@/shared/api/sportsman/SportsmanApi.type.ts";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import { useAllLocations } from "@/shared/api/location/hooks/use-all-locations.hook.ts";
import FormSwitcherLayout, {
  type FormSwitcherComponent,
} from "@/pages/camps/camp/components/forms-layouts/FormSwitcherLayout.tsx";
import UniversalCheckForm from "@/pages/camps/camp/forms/universal/UniversalCheckForm.tsx";

import UniversalTextFieldForm from "@/pages/camps/camp/forms/universal/UniversalTextFieldForm.tsx";
import type { CampsLocation } from "@/shared/api/location/LocationApi.type.ts";
import type {
  Field,
  UniversalFormValues,
} from "@/pages/camps/camp/forms/universal/universal-form.type.ts";

interface Props {
  onDone?: (data?: Sportsman[]) => Promise<void> | void;
  campId: number;
}

const FIELDS: Field<CampsLocation>[] = [
  {
    key: "name",
    label: "Название",
  },
];

export default function AddLocationToCampButton(props: Props) {
  const { openModal, closeModal } = useModal();

  const { state } = useAllLocations();

  const addToCamp = async (values: CheckFormValues) => {
    await LocationApi.addManyToCamp(props.campId, values);
    closeModal();
    props.onDone?.();
  };

  const createNewLocation = async (
    values: UniversalFormValues<CampsLocation>,
  ) => {
    try {
      const result = await LocationApi.createMany({
        items: values.items.map((item) => ({ name: item.name })),
      });
      await addToCamp({
        items: result.map((item) => item.id),
      });
      alert("локации созданы и добавлены в доступные локации сбора");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const Keys = {
    DB_LOCATIONS: "dbLocations",
    CREATE_LOCATION: "createLocation",
  };

  const components: FormSwitcherComponent[] = [
    {
      key: Keys.CREATE_LOCATION,
      label: "Создать",
      element: (
        <UniversalTextFieldForm<CampsLocation, CampsLocation>
          fields={FIELDS}
          formId={Keys.CREATE_LOCATION}
          onSubmit={createNewLocation}
        />
      ),
    },
    {
      key: Keys.DB_LOCATIONS,
      label: "Загрузить из базы данных",
      element: (
        <UniversalCheckForm
          fields={FIELDS}
          entities={state}
          formId={Keys.DB_LOCATIONS}
          onSubmit={addToCamp}
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
