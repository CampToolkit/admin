import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import GroupForm, {
  type GroupFormValues,
} from "@/pages/camps/camp/forms/GroupForm.tsx";
import type { UpdateGroupDto } from "@/shared/api/group/GroupApi.dto.ts";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";

type PropsType = {
  groupId: number;
  initialValues: GroupFormValues;
};

export default function EditGroupButton(props: PropsType) {
  const { initialValues, groupId } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: GroupFormValues) => {
    const dto: UpdateGroupDto = {
      name: data.name,
      parentId: data.parentId ?? undefined,
    };
    await GroupApi.update(groupId, dto);
    closeModal();
  };

  const form = () => (
    <GroupForm onSubmit={onSubmit} initialValues={initialValues} />
  );

  const onClick = () => {
    openModal({
      content: form,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.light",
        },
      }}
    >
      <EditIcon />
    </IconButton>
  );
}
