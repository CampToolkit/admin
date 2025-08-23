import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { TabPropsType } from "./CampForm";

export default function Schedule({ formik }: TabPropsType) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Название"
          name="name"
          value={formik.values.camp.city}
          onChange={(event) => {
            formik.handleChange(event);
          }}
        />
      </Grid>
    </Grid>
  );
}
