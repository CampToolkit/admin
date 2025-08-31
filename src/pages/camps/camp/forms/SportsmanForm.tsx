import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";
import TabLayout from "../components/TabLayout";
import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

export interface SportsmanFormValues {
  firstName: string;
  lastName: string;
  patrName: string;
}

export type SportsmanFormPropsType = {
  initialValues: SportsmanFormValues;
  onSubmit: (values: SportsmanFormValues) => void;
};

export default function SportsmanForm(props: SportsmanFormPropsType) {
  const { initialValues, onSubmit } = props;
  const formik = useFormik<SportsmanFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });
  return (
    <TabLayout>
      <LeftLayoutItem>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Фамилия"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Имя"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              size="small"
              fullWidth
              label="Отчество"
              name="patrName"
              value={formik.values.patrName}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </LeftLayoutItem>
      <RightLayoutItem>
        <FormActions
          saveCallback={formik.handleSubmit}
          clearCallback={formik.handleReset}
        />
      </RightLayoutItem>
    </TabLayout>
  );
}
