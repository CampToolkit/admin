import { Button } from "@mui/material";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import PersonEntityTable from "@/modules/shared/components/PersonEntityTable.tsx";
import { GroupApi } from "@/common/api/group/GroupApi.ts";
import { textNoWrapStyle } from "@/styles/text-no-wrap.ts";

// todo реализовать удаление спортсмена из группы (onRemoveFrom)
export interface Props {
  groupId: number;
}

export default function ShowSportsmanListButton(props: Props) {
  const { groupId } = props;
  const { openModal } = useModal();

  const onClick = async (groupId: number) => {
    const sportsmen = await GroupApi.getSportsmen(groupId);
    const content = () => (
      <PersonEntityTable persons={sportsmen} onRemoveFrom={() => {}} />
    );

    openModal({
      content: content,
      showConfirmButton: true,
      showCancelButton: false,
    });
  };

  return (
    <Button
      onClick={() => {
        onClick(groupId);
      }}
    >
      <span style={textNoWrapStyle}>Список спортсменов</span>
    </Button>
  );
}
