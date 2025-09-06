import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Button } from "@mui/material";
import type {
  CreateGroupBulkDto,
  CreateGroupDto,
} from "@/shared/api/group/GroupApi.dto.ts";
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

  const onSubmit = async (campId: number, values: GroupsFormValues) => {
    console.log("campId", campId);
    const dto: CreateGroupBulkDto = {
      items: values.groups.map((item) => ({
        campId,
        name: item.name,
        parentId: item.parentId ?? null,
      })),
    };
    console.log("dto", dto);
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
    <GroupsForm onSubmit={(values) => onSubmit(campId, values)} />
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
