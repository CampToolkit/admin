import { useEffect, useState } from "react";
import type {
  UniversalFormProps,
  UniversalFormValues,
} from "@/pages/camps/camp/forms/universal/universal-form.type.ts";

import { FieldArray, FormikProvider, useFormik } from "formik";

import { Box, Button, Grid, TextField } from "@mui/material";

import type { Entity } from "@/common/api/lib/types/Entity.type.ts";
import type { NewEntity } from "@/common/api/lib/types/BaseApi.type.ts";

const GRIDS_AMOUNT = 12;
const REMOVE_BUTTON_SIZE = 1;

function createInitialValuesItem<T, D extends Partial<NewEntity<T>>>(
  keys: Array<keyof D>,
) {
  const result = {} as D;
  for (const key of keys) {
    result[key] = "" as unknown as any;
  }
  return result;
}

// todo добавить валидацию полей
export default function UniversalTextFieldForm<
  T extends Entity,
  D extends Partial<NewEntity<T>>,
>(props: UniversalFormProps<T, UniversalFormValues<D>>) {
  const { onSubmit, formId, fields } = props;
  const [fieldSize, setFieldSize] = useState<number>(11);

  const initialValues: UniversalFormValues<D> = {
    items: [createInitialValuesItem<T, D>(fields.map((item) => item.key))],
  };

  const formik = useFormik<UniversalFormValues<D>>({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    setFieldSize(
      Math.floor((GRIDS_AMOUNT - REMOVE_BUTTON_SIZE) / fields.length),
    );
  }, []);

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} id={formId}>
        <FieldArray name="items">
          {({ push, remove }) => (
            <>
              {formik.values?.items.map((_, index) => (
                <Grid key={index} container columnSpacing={1} mb={1}>
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
