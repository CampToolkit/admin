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

import type { Person } from "@/common/api/lib/types/Person.type.ts";
import type { ComponentType } from "react";
import type { EditPersonButtonPropsType } from "@/modules/shared/types/edit-person-button-props.type.ts";

interface Props<T extends Person> {
  persons: T[];
  onRemoveFromCamp: (personId: number) => void;
  EditPersonButton: ComponentType<EditPersonButtonPropsType>;
  onDone?: () => Promise<void> | void;
}

export default function PersonEntityTable<T extends Person>({
  persons,
  onRemoveFromCamp,
  EditPersonButton,
  onDone,
}: Props<T>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell width={"1%"}></TableCell>
            <TableCell width={"1%"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.lastName}</TableCell>
              <TableCell>{p.firstName}</TableCell>
              <TableCell>{p.patrName}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onRemoveFromCamp(p.id)}
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
                <EditPersonButton
                  personId={p.id}
                  initialValues={p}
                  onDone={onDone}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
