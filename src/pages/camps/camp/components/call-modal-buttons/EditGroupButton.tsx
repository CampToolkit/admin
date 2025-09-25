import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import GroupForm, {
  type GroupFormValues,
} from "@/pages/camps/camp/forms/group/GroupForm.tsx";
import type { UpdateGroupDto } from "@/common/api/group/GroupApi.dto.ts";
import { GroupApi } from "@/common/api/group/GroupApi.ts";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

type PropsType = {
  initialValues: GroupFormValues;
  selectOptions: SelectOption[];
  onDone: () => Promise<void> | void;
};

export default function EditGroupButton(props: PropsType) {
  const { initialValues, selectOptions, onDone } = props;
  const { openModal, closeModal } = useModal();

  const onSubmit = async (data: GroupFormValues) => {
    const dto: UpdateGroupDto = {
      name: data.name,
      parentId: data.parentId ?? undefined,
    };
    await GroupApi.update(initialValues.id, dto);
    closeModal();
    onDone();
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
