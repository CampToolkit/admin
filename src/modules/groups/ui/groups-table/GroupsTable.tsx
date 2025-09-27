import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { Group } from "@/common/api/group/GroupApi.type.ts";
import GroupRow from "@/modules/groups/ui/groups-table/GroupRow.tsx";
import type { SelectOption } from "@/modules/groups/ui/forms/select-options.type.ts";

interface Props {
  list: Group[];
  selectOptions: SelectOption[];
  onDone: () => Promise<void> | void;
}

export default function GroupsTable(props: Props) {
  const { list, selectOptions, onDone } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 900 }}>Название</TableCell>
            <TableCell width={"1%"}></TableCell>
            <TableCell width={"1%"}></TableCell>
            <TableCell width={"1%"}></TableCell>
            <TableCell width={"1%"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <GroupRow
              key={item.id}
              item={item}
              level={1}
              selectOptions={selectOptions}
              onDone={onDone}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
