import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";
import type { CreateGroupDto } from "@/shared/api/group/GroupApi.dto.ts";
import GroupsForm, {
  type GroupsFormValues,
} from "@/pages/camps/camp/forms/GroupsForm.tsx";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";

interface Props {
  campId: number;
  onCreated?: () => void;
}

export default function CreateGroupsButton(props: Props) {
  const { onCreated = () => {}, campId } = props;

  const { openModal, closeModal } = useModal();

  const onSubmit = async (values: GroupsFormValues) => {
    const dto: CreateGroupDto = {
      campId,
      name: values.groups[0].name,
      parentId: values.groups[0].parentId ?? undefined,
    };
    await GroupApi.create(dto);
    closeModal();
    onCreated();
  };

  const sportsmen = () => <GroupsForm onSubmit={onSubmit} />;

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
