import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";

import GroupsForm, {
  type GroupsFormValues,
} from "@/pages/camps/camp/forms/group/GroupsForm.tsx";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

interface Props {
  campId: number;
  selectOptions: SelectOption[];
  onCreated?: () => void;
}

export default function CreateGroupsButton(props: Props) {
  const { campId, selectOptions, onCreated = () => {} } = props;

  const { openModal, closeModal } = useModal();

  const onSubmit = async (campId: number, values: GroupsFormValues) => {
    const dto = {
      items: values.groups.map((item) => ({
        campId,
        name: item.name,
        parentId: item.parentId === 0 ? null : item.parentId,
      })),
    };
    try {
      await GroupApi.createMany(dto);
      alert("Группы сохранили");
      closeModal();
      onCreated();
    } catch (error) {
      console.log(error);
    }
  };

  const sportsmen = () => (
    <GroupsForm
      selectOptions={selectOptions}
      onSubmit={(values) => onSubmit(campId, values)}
    />
  );

  const onClickCreate = async () => {
    openModal({
      content: sportsmen,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={onClickCreate}
    >
      Добавить новую группу
    </Button>
  );
}
