import type { Group } from "@/common/api/group/GroupApi.type.ts";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditGroupButton from "@/modules/groups/ui/EditGroupButton.tsx";
import type { SelectOption } from "@/modules/groups/ui/forms/select-options.type.ts";
import { GroupApi } from "@/common/api/group/GroupApi.ts";
import AddPersonToEntityButton from "@/common/components/buttons/AddPersonToEntityButton.tsx";
import type { CheckFormValues } from "@/pages/camp/forms/universal/check-form.type";
import { useCampSportsmen } from "@/pages/camp/hooks/use-camp-sportsmen.hook.ts";
import { useParams } from "react-router-dom";
import type { AddSportsmenToGroupDto } from "@/common/api/group/GroupApi.dto.ts";
import ShowSportsmanListButton from "@/modules/groups/ui/ShowSportsmanListButton.tsx";

interface Props {
  item: Group;
  level: number;
  selectOptions: SelectOption[];
  onDone: () => Promise<void> | void;
}

export default function GroupRow({
  item,
  level,
  selectOptions,
  onDone,
}: Props) {
  const { campId } = useParams();
  const removeFromCamp = async (id: number) => {
    try {
      await GroupApi.delete(id);
      alert("group removed");
      onDone();
    } catch (error) {
      console.log(error);
    }
  };

  const { state: sportsmen } = useCampSportsmen(Number(campId));
  const addSportsmanToGroup = async (
    groupId: number,
    values: CheckFormValues,
  ) => {
    const dto: AddSportsmenToGroupDto = {
      campId: Number(campId),
      items: values.items,
    };
    await GroupApi.addSportsmen(groupId, dto);
    onDone();
  };

  return (
    <>
      <TableRow key={item.id}>
        <TableCell
          sx={{
            paddingLeft: `${level}rem`,
          }}
        >
          {item.name}
        </TableCell>
        <TableCell>
          <ShowSportsmanListButton groupId={item.id} />
        </TableCell>
        <TableCell>
          {level === 1 && (
            //   /*  note отдавать только спортсменов без группы */
            <AddPersonToEntityButton
              entities={sportsmen}
              onSubmit={(values) => addSportsmanToGroup(item.id, values)}
            />
          )}
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => removeFromCamp(item.id)}
            sx={{
              color: "error.main",
              "&:hover": {
                backgroundColor: "error.light",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <EditGroupButton
            initialValues={{
              id: item.id,
              name: item.name,
              parentId: item?.parentId ?? 0,
            }}
            selectOptions={selectOptions}
            onDone={onDone}
          />
        </TableCell>
      </TableRow>
      {item?.children &&
        item?.children.map((child) => (
          <GroupRow
            key={child.id}
            item={child}
            level={level + 1}
            selectOptions={selectOptions}
            onDone={onDone}
          />
        ))}
    </>
  );
}
