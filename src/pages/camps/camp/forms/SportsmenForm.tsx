import { FormikProvider, FieldArray, useFormik } from "formik";
import { Stack, Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";

import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

export interface SportsmenFormValues {
  items: {
    firstName: string;
    lastName: string;
    patrName: string;
  }[];
}

export type SportsmenFormPropsType = {
  initialValues: SportsmenFormValues;
  onSubmit: (values: SportsmenFormValues) => void;
};

export default function SportsmenForm(props: SportsmenFormPropsType) {
  const { initialValues, onSubmit } = props;
  const formik = useFormik<SportsmenFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });
  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LeftLayoutItem>
          <Box component="form" onSubmit={formik.handleSubmit}>
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
        </LeftLayoutItem>

        <RightLayoutItem>
          <>
            <Stack gap={1} mb={3}>
              <Button variant="outlined">Загрузить из файла</Button>
              <Button variant="outlined">Загрузить из базы данных</Button>
            </Stack>

            <FormActions
              saveCallback={formik.handleSubmit}
              clearCallback={formik.handleReset}
            />
          </>
        </RightLayoutItem>
      </FormikProvider>
    </TabLayout>
  );
}
