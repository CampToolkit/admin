import { Form, FormikProvider, useFormik } from "formik";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import type { CheckTableFormValues } from "@/pages/camps/camp/components/check-tables/CheckTableFormValues.type.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import type { ChangeEvent } from "react";

interface Props<T extends Entity> {
  keys: Array<keyof T>;
  entities: T[];
  formId: string;
  onSubmit: (values: CheckTableFormValues) => Promise<void> | void;
}

const INITIAL_VALUES = {
  items: [] as number[],
};

export default function UniversalCheckForm<T extends Entity>(props: Props<T>) {
  const { keys, entities, formId, onSubmit } = props;

  const formik = useFormik<CheckTableFormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>, entityId: number) => {
    if (e.target.checked) {
      formik.setFieldValue("items", [...formik.values.items, entityId]);
    } else {
      formik.setFieldValue(
        "items",
        formik.values.items.filter((item) => item !== entityId),
      );
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form id={formId}>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell key={String(key)}>{String(key)}</TableCell>
              ))}
              <TableCell>Добавить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <TableRow>
                {keys.map((key) => (
                  <TableCell>{String(entity[key])}</TableCell>
                ))}
                <Checkbox
                  checked={formik.values.items.includes(entity.id)}
                  onChange={(e) => onChange(e, entity.id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Form>
    </FormikProvider>
  );
}
