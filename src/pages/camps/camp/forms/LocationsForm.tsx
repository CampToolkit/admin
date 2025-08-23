import { Button, Stack, Grid, TextField } from "@mui/material";
import type { TabPropsType } from "../CampForm";
import { FieldArray, FormikProvider } from "formik";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";

export default function LocationsForm({ formik }: TabPropsType) {
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
                        name={`camp.locations.${index}.name`}
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
            <ManageFormButtonsBlock
              saveCallback={formik.handleSubmit}
              clearCallback={formik.handleReset}
            />
          </>
        </RightLayoutItem>
      </FormikProvider>
    </TabLayout>
  );
}
