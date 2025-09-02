import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { useFormik, FormikProvider, Form } from "formik";
import type { Person } from "@/shared/types/Person.type.ts";

export interface CheckPersonTableFormValues {
  items: number[];
}

interface Props<T> {
  persons: T[];
  formId: string;
  onSubmit: (values: CheckPersonTableFormValues) => Promise<void> | void;
}

const INITIAL_VALUES = {
  items: [] as number[],
};

export default function CheckPersonTableForm<T extends Person>(
  props: Props<T>,
) {
  const { persons, formId, onSubmit } = props;
  const formik = useFormik<CheckPersonTableFormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  const { values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form id={formId}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фамилия</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Отчество</TableCell>
              <TableCell>Добавить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.lastName}</TableCell>
                <TableCell>{p.firstName}</TableCell>
                <TableCell>{p.patrName}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={values.items.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue("items", [...values.items, p.id]);
                      } else {
                        setFieldValue(
                          "items",
                          values.items.filter((id) => id !== p.id),
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
  );
}
