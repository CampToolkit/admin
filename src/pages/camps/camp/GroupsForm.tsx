import { Button, Stack, Box, Grid, TextField } from "@mui/material";
import type { TabPropsType } from "./CampForm";
import { FieldArray, FormikProvider } from "formik";

export default function GroupsForm({ formik }: TabPropsType) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        minHeight: "100%",
      }}
    >
      <Box sx={{ flexGrow: 2 }} component="form" onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <FieldArray name="groups">
            {({ push, remove }) => (
              <>
                {formik.values.groups.map((_, index) => (
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
                        name={`camp.groups.${index}.name`}
                        value={formik.values.groups[index].name}
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
                  Добавить группу
                </Button>
              </>
            )}
          </FieldArray>
        </FormikProvider>
      </Box>

      <Box>
        <Stack gap={1} mb={3}>
          <Button variant="outlined">Загрузить из базы данных</Button>
        </Stack>
        <Stack gap={1}>
          <Button type="submit" variant="contained" fullWidth>
            Сохранить
          </Button>
          <Button color="error" variant="outlined">
            Очистить форму
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
