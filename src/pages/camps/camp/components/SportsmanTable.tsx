import DeleteIcon from "@mui/icons-material/Delete";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { SportsmanApi } from "@/shared/api/sportsman/SportsmanApi.ts";
import EditSportsmanButton from "@/pages/camps/camp/components/EditSportsmanButton.tsx";

type Sportsman = {
  id: number;
  lastName: string;
  firstName: string;
  patrName: string;
};

interface Props {
  campId: number;
  sportsmen: Sportsman[];
}

export default function SportsmanTable({ campId, sportsmen }: Props) {
  const removeFromCamp = async (sportsmanId: number) => {
    await SportsmanApi.removeFromCamp(sportsmanId, { campId });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sportsmen.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.lastName}</TableCell>
              <TableCell>{s.firstName}</TableCell>
              <TableCell>{s.patrName}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeFromCamp(s.id)}
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
                <EditSportsmanButton sportsmanId={s.id} initialValues={s} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
