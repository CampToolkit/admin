import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import UniversalCheckForm from "@/pages/camps/camp/forms/universal/UniversalCheckForm.tsx";
import type { CheckFormValues } from "@/pages/camps/camp/forms/universal/check-form.type.ts";
import type { Person } from "@/common/api/lib/types/Person.type.ts";
import { PERSON_FIELDS } from "@/common/components/buttons/consts/person-fields.const.ts";
import { Button } from "@mui/material";

export interface AddPersonToEntityButtonProps<T extends Person> {
  entities: T[];
  onSubmit: (values: CheckFormValues) => void;
  onDone?: () => void;
}

const FORM_ID = "AddPersonToEntityButton25092047";

export default function AddPersonToEntityButton<T extends Person>(
  props: AddPersonToEntityButtonProps<T>,
) {
  const { entities, onSubmit } = props;
  const { openModal } = useModal();

  const content = () => {
    return (
      <UniversalCheckForm
        entities={entities}
        fields={PERSON_FIELDS}
        formId={FORM_ID}
        onSubmit={onSubmit}
      />
    );
  };

  const onClick = async () => {
    openModal({
      content: content,
      formId: FORM_ID,
      showConfirmButton: true,
      showCancelButton: true,
      title: "Добавить спортсменов в группу",
    });
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      <span style={{ whiteSpace: "nowrap" }}>Добавить спортсменов</span>
    </Button>
  );
}
