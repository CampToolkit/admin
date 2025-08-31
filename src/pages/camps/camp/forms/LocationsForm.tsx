import { Button, Stack, Grid, TextField } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

export interface LocationsFormValues {
  locations: { name: string }[];
}

const initialValues = {
  locations: [{ name: "" }],
};

interface Props {
  onSubmit: (values: LocationsFormValues) => void;
}

export default function LocationsForm({ onSubmit }: Props) {
  const formik = useFormik<LocationsFormValues>({
    initialValues,
    onSubmit,
  });

  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LeftLayoutItem>
          <FieldArray name="locations">
            {({ push, remove }) => (
              <>
                {formik.values.locations.map((_, index) => (
                  <Grid
                    container
                    key={index}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Grid size={11}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Название"
                        name={`locations.${index}.name`}
                        value={formik.values.locations[index].name}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid size={1}>
                      <Button color="error" onClick={() => remove(index)}>
                        ✕
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button type="button" onClick={() => push({ name: "" })}>
                  Добавить локацию
                </Button>
              </>
            )}
          </FieldArray>
        </LeftLayoutItem>

        <RightLayoutItem>
          <>
            <Stack gap={1} mb={3}>
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
