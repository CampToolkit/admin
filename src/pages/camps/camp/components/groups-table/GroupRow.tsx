import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditGroupButton from "@/pages/camps/camp/components/call-modal-buttons/EditGroupButton.tsx";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

interface Props {
  item: Group;
  level: number;
  selectOptions: SelectOption[];
}

export default function GroupRow({ item, level, selectOptions }: Props) {
  const removeFromCamp = (campId: number, id: number) => {
    console.log(campId, id);
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
          <IconButton
            onClick={() => removeFromCamp(item.campId, item.id)}
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
            item={item}
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
          />
        ))}
    </>
  );
}
