import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import LeftLayoutItem from "@/pages/camps/camp/components/forms-layouts/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/components/forms-layouts/RightLayoutItem.tsx";
import TabLayout from "../../../pages/camps/camp/components/forms-layouts/TabLayout.tsx";
import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";

export interface PersonBaseFormValues {
  firstName: string;
  lastName: string;
  patrName: string;
}

export type PersonBaseFormPropsType = {
  initialValues: PersonBaseFormValues;
  onSubmit: (values: PersonBaseFormValues) => void;
};

export default function PersonBaseForm(props: PersonBaseFormPropsType) {
  const { initialValues, onSubmit } = props;
  const formik = useFormik<PersonBaseFormValues>({
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
