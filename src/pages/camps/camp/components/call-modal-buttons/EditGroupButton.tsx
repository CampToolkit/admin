import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import GroupForm, {
  type GroupFormValues,
} from "@/pages/camps/camp/forms/group/GroupForm.tsx";
import type { UpdateGroupDto } from "@/shared/api/group/GroupApi.dto.ts";
import { GroupApi } from "@/shared/api/group/GroupApi.ts";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";

type PropsType = {
  initialValues: GroupFormValues;
  selectOptions: SelectOption[];
  item?: Group;
};

export default function EditGroupButton(props: PropsType) {
  const { initialValues, selectOptions } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: GroupFormValues) => {
    const dto: UpdateGroupDto = {
      name: data.name,
      parentId: data.parentId ?? undefined,
    };
    await GroupApi.update(initialValues.id, dto);
    closeModal();
  };

  const form = () => (
    <GroupForm
      selectOptions={selectOptions}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
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
