import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

import TabLayout from "@/pages/camps/camp/components/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/forms/form-items/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/forms/form-items/RightLayoutItem.tsx";

import FormActions from "@/pages/camps/camp/forms/form-items/FormActions.tsx";

import { useFormik } from "formik";

export interface LocationFormValues {
  id: number;
  name: string;
}

interface Props {
  initialValues: LocationFormValues;
  onSubmit: (values: LocationFormValues) => void;
}

export default function LocationForm(props: Props) {
  const { initialValues, onSubmit } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });

  return (
    <TabLayout>
      <LeftLayoutItem>
        <Grid container rowSpacing={12} columnSpacing={2}>
          <Grid size={6}>
            <TextField
              size="small"
              fullWidth
              label="Название"
              name="name"
              value={formik.values.name}
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
