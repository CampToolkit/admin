import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import GroupRow from "@/pages/camps/camp/components/groups-table/GroupRow.tsx";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

interface Props {
  list: Group[];
  selectOptions: SelectOption[];
}

export default function GroupsTable(props: Props) {
  const { list, selectOptions } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 900 }}>Название</TableCell>
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
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
