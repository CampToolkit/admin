import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { CampFormFormikType } from "../use-camp-form.hook";
import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";

interface BaseInfoProps {
  formik: CampFormFormikType;
}

export default function BaseInfo({ formik }: BaseInfoProps) {
  return (
    <TabLayout>
      <LeftLayoutItem>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={1}>
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
      </LeftLayoutItem>

      <RightLayoutItem>
        <ManageFormButtonsBlock
          saveCallback={formik.handleSubmit}
          clearCallback={formik.handleReset}
        />
      </RightLayoutItem>
    </TabLayout>
  );
}
