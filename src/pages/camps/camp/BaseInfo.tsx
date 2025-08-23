import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { CampFormFormikType } from "./use-camp-form.hook";

interface BaseInfoProps {
  formik: CampFormFormikType;
}

export default function BaseInfo({ formik }: BaseInfoProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Имя"
          name="name"
          value={formik.values.name}
          onChange={(event) => {
            console.log(event);

            formik.handleChange(event);
          }}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Дата начала"
          name="dateStart"
          value={formik.values.dateStart || ""}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Дата окончания"
          name="dateEnd"
          value={formik.values.dateEnd || ""}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Город"
          name="city"
          value={formik.values.city || ""}
          onChange={formik.handleChange}
        />
      </Grid>
    </Grid>
  );
}
