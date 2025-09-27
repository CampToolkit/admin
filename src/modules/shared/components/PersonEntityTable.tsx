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
  Box,
} from "@mui/material";

import type { Person } from "@/common/api/lib/types/Person.type.ts";
import type { ComponentType } from "react";
import type { EditPersonButtonPropsType } from "@/modules/shared/types/edit-person-button-props.type.ts";
import { scrollStyleChild } from "@/styles/scroll.ts";

interface Props<T extends Person> {
  persons: T[];
  onRemoveFrom?: (personId: number) => void;
  EditPersonButton?: ComponentType<EditPersonButtonPropsType>;
  onDone?: () => Promise<void> | void;
}

export default function PersonEntityTable<T extends Person>({
  persons,
  onRemoveFrom,
  EditPersonButton,
  onDone,
}: Props<T>) {
  return (
    <Box sx={scrollStyleChild}>
      {/* todo выяснить что дает TableContainer. Закоментил, чтобы работал stickyHeader */}
      {/*<TableContainer component={Paper}>*/}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            {onRemoveFrom && <TableCell width={"1%"}></TableCell>}
            {EditPersonButton && <TableCell width={"1%"}></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.lastName}</TableCell>
              <TableCell>{p.firstName}</TableCell>
              <TableCell>{p.patrName}</TableCell>
              {onRemoveFrom && (
                <TableCell>
                  <IconButton
                    onClick={() => onRemoveFrom(p.id)}
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
              )}

              {EditPersonButton && (
                <TableCell>
                  <EditPersonButton
                    personId={p.id}
                    initialValues={p}
                    onDone={onDone}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*</TableContainer>*/}
    </Box>
  );
}
