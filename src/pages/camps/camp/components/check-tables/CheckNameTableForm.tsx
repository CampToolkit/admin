import { Form, FormikProvider, useFormik } from "formik";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { CheckTableFormValues } from "@/pages/camps/camp/components/check-tables/CheckTableFormValues.type.ts";
import { scrollStyleChild } from "@/styles/scroll.ts";

interface Props<T> {
  entities: T[];
  formId: string;
  onSubmit: (values: CheckTableFormValues) => Promise<void> | void;
}

const INITIAL_VALUES = {
  items: [] as number[],
};

export default function CheckNameTableForm<
  T extends { id: number; name: string },
>(props: Props<T>) {
  const { entities, formId, onSubmit } = props;
  const formik = useFormik<CheckTableFormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  const { values, setFieldValue } = formik;

  return (
    <Box sx={scrollStyleChild}>
      <FormikProvider value={formik}>
        <Form id={formId}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Добавить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities.map((entity) => (
                <TableRow key={entity.id}>
                  <TableCell>{entity.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={values.items.includes(entity.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("items", [...values.items, entity.id]);
                        } else {
                          setFieldValue(
                            "items",
                            values.items.filter((id) => id !== entity.id),
                          );
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Form>
      </FormikProvider>
    </Box>
  );
}
