import { FormikProvider, FieldArray, useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

export interface PersonFormValues {
  items: {
    firstName: string;
    lastName: string;
    patrName: string;
  }[];
}

export type SportsmenFormPropsType = {
  initialValues: PersonFormValues;
  onSubmit: (values: PersonFormValues) => void;
  formId?: string;
};

export default function CheckPersonForm(props: SportsmenFormPropsType) {
  const { initialValues, onSubmit, formId } = props;
  const formik = useFormik<PersonFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });
  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} id={formId}>
        <FieldArray name="items">
          {({ push, remove }) => (
            <>
              {formik.values?.items?.map((_, index) => (
                <Grid
                  container
                  columnSpacing={1}
                  key={index}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Фамилия"
                      name={`items.${index}.lastName`}
                      value={formik.values.items[index].lastName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Имя"
                      name={`items.${index}.firstName`}
                      value={formik.values.items[index].firstName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Отчество"
                      name={`items.${index}.patrName`}
                      value={formik.values.items[index].patrName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid size={1}>
                    <Button color="error" onClick={() => remove(index)}>
                      ✕
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button
                type="button"
                onClick={() => push(initialValues.items[0])}
              >
                Добавить спортсмена
              </Button>
            </>
          )}
        </FieldArray>
      </Box>
    </FormikProvider>
  );
}
