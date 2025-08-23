import { Button, Box, TextField, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { CampFormFormikType } from "./use-camp-form.hook";

interface BaseInfoProps {
  formik: CampFormFormikType;
}

export default function BaseInfo({ formik }: BaseInfoProps) {
  return (
    <Stack
      direction="row"
      spacing={10}
      sx={{
        minHeight: "100%",
      }}
    >
      <Box sx={{ flexGrow: 2 }} component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Название"
              name="camp.name"
              value={formik.values.camp.name}
              onChange={(event) => {
                formik.handleChange(event);
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Дата начала"
              name="camp.dateStart"
              value={formik.values.camp.dateStart}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Дата окончания"
              name="camp.dateEnd"
              value={formik.values.camp.dateEnd}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Город"
              name="camp.city"
              value={formik.values.camp.city}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Button type="submit" variant="contained" fullWidth>
          Сохранить
        </Button>
      </Box>
    </Stack>
  );
}
