import { FormikProvider, FieldArray } from "formik";
import { Stack, Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";

import type { TabPropsType } from "../CampForm";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";

export default function SportsmenForm({ formik }: TabPropsType) {
  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LeftLayoutItem>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FieldArray name="sportsmen">
              {({ push, remove }) => (
                <>
                  {formik.values.sportsmen.map((_, index) => (
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
                          name={`sportsmen.${index}.lastName`}
                          value={formik.values.sportsmen[index].lastName}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={4}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Имя"
                          name={`sportsmen.${index}.firstName`}
                          value={formik.values.sportsmen[index].firstName}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={3}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Отчество"
                          name={`sportsmen.${index}.patrName`}
                          value={formik.values.sportsmen[index].patrName}
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
                    onClick={() =>
                      push({ lastName: "", firstName: "", patrName: "" })
                    }
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
