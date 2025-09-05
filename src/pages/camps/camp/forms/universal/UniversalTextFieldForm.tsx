import type { Entity } from "@/shared/api/lib/types/Entity.type.ts";
import { Box, Button, Grid, TextField } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";

type Item<T extends Entity> = {
  [K in keyof T]?: string;
};

export interface UniversalTextFieldFormValues<T extends Entity> {
  items: Item<T>[];
}

interface Field<T extends Entity> {
  key: keyof T;
  label: string;
}

export interface NewPersonFormProps<T extends Entity> {
  fields: Field<T>[];
  initialValues?: UniversalTextFieldFormValues<T>;
  onSubmit: (values: UniversalTextFieldFormValues<T>) => void;
  formId?: string;
}

const GRIDS_AMOUNT = 12;
const REMOVE_BUTTON_SIZE = 1;

function createInitialValuesItem<T extends Entity>(keys: Array<keyof T>) {
  const result: Partial<Record<keyof T, string>> = {};
  for (const key of keys) {
    result[key] = "";
  }
  return result;
}

export default function UniversalTextFieldForm<T extends Entity>(
  props: NewPersonFormProps<T>,
) {
  const { onSubmit, formId, fields } = props;
  const [fieldSize, setFieldSize] = useState<number>(11);
  const initialValues = props.initialValues ?? {
    items: [createInitialValuesItem(fields.map((item) => item.key))],
  };

  const formik = useFormik<UniversalTextFieldFormValues<T>>({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    setFieldSize(Math.floor(fields.length - REMOVE_BUTTON_SIZE) / GRIDS_AMOUNT);
  }, []);

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} id={formId}>
        <FieldArray name="items">
          {({ push, remove }) => (
            <>
              {formik.values?.items.map((_, index) => (
                <Grid container key={index}>
                  {fields.map((field) => (
                    <Grid key={field.key as string} size={fieldSize}>
                      <TextField
                        key={field.key as string}
                        size={"small"}
                        fullWidth
                        label={field.label}
                        name={`items.${index}.${field.key as string}`}
                        value={formik.values.items[index][field.key]}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  ))}
                  <Grid size={1}>
                    <Button color={"error"} onClick={() => remove(index)}>
                      x
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={() => push({ ...initialValues.items[0] })}>
                Добавить
              </Button>
            </>
          )}
        </FieldArray>
      </Box>
    </FormikProvider>
  );
}
