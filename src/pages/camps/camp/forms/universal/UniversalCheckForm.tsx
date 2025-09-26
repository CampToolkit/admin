import type { ChangeEvent } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { Form, FormikProvider, useFormik } from "formik";
import type {
  CheckFormProps,
  CheckFormValues,
} from "@/pages/camps/camp/forms/universal/check-form.type.ts";
import type { Entity } from "@/common/api/lib/types/Entity.type.ts";
import { scrollStyleChild } from "@/styles/scroll.ts";

const theadStyles = {
  fontWeight: "bold",
};

const INITIAL_VALUES = {
  items: [] as number[],
};

export default function UniversalCheckForm<T extends Entity>(
  props: CheckFormProps<T>,
) {
  const { fields, entities, formId, onSubmit } = props;

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
    <Box sx={scrollStyleChild}>
      <FormikProvider value={formik}>
        <Form id={formId}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell
                    key={field.key as string}
                    sx={{
                      ...theadStyles,
                    }}
                  >
                    {field.label}
                  </TableCell>
                ))}
                <TableCell sx={theadStyles} width={"1%"}>
                  Добавить
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities.map((entity) => (
                <TableRow key={entity.id}>
                  {fields.map((field) => (
                    <TableCell>{entity[field.key] as string}</TableCell>
                  ))}
                  <TableCell align={"center"}>
                    <Checkbox
                      key={`${entity.id}${entity.id}`}
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
    </Box>
  );
}
