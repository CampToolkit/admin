import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { LocationApi } from "@/shared/api/location/LocationApi.ts";
import EditLocationButton from "@/pages/camps/camp/components/EditLocationButton.tsx";

interface Props {
  campId: number;
  list: { id: number; name: string }[];
}

export default function LocationsTable(props: Props) {
  const { campId, list } = props;

  const removeFromCamp = async (id: number, campId: number) => {
    await LocationApi.removeFromCamp(id, { campId });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell width={"1%"}></TableCell>
            <TableCell width={"1%"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeFromCamp(item.id, campId)}
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
                <EditLocationButton itemId={item.id} initialValues={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
