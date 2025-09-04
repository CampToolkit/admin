import type { ChangeEvent } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { Form, FormikProvider, useFormik } from "formik";
import type { CheckFormValues } from "@/pages/camps/camp/components/check-tables/check-form-values.type.ts";
import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";

interface Props<T extends Entity> {
  keys: Array<keyof T>;
  entities: T[];
  formId: string;
  onSubmit: (values: CheckFormValues) => Promise<void> | void;
}

const INITIAL_VALUES = {
  items: [] as number[],
};

/**
 * Props for the UniversalCheckForm component.
 * @typedef {Object} Props
 * @template T - Entity type extending the base Entity interface.
 * @property {Array<keyof T>} keys - Array of keys to display as table columns.
 * @property {T[]} entities - Array of entities to display in the table.
 * @property {string} formId - Unique ID for the form element.
 * @property {(values: CheckFormValues) => void} onSubmit - Callback function to handle form submission.
 **/
export default function UniversalCheckForm<T extends Entity>(props: Props<T>) {
  const { keys, entities, formId, onSubmit } = props;

  const formik = useFormik<CheckFormValues>({
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
        <Table stickyHeader>
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
                <TableCell>
                  <Checkbox
                    checked={formik.values.items.includes(entity.id)}
                    onChange={(e) => onChange(e, entity.id)}
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
