import LeftLayoutItem from "@/pages/camps/camp/components/forms-layouts/LeftLayoutItem.tsx";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField } from "@mui/material";
import RightLayoutItem from "@/pages/camps/camp/components/forms-layouts/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";
import TabLayout from "@/pages/camps/camp/components/forms-layouts/TabLayout.tsx";
import { useFormik } from "formik";

export interface GroupFormValues {
  id: number;
  name: string;
  parentId: number | null;
}

interface Props {
  initialValues: GroupFormValues;
  onSubmit: (values: GroupFormValues) => void;
}

const PARENT_GROUP_OPTIONS = [
  {
    index: 1,
    parentId: 1,
    name: "основная",
  },
  {
    index: 2,
    parentId: 2,
    name: "parent1",
  },
  {
    index: 3,
    parentId: 3,
    name: "parent2",
  },
];

export default function GroupForm(props: Props) {
  const { initialValues, onSubmit } = props;

  const formik = useFormik<GroupFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });

  return (
    <TabLayout>
      <LeftLayoutItem>
        <Grid container rowSpacing={2} columnSpacing={2}>
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
          <Grid size={6}>
            <Select
              size="small"
              labelId="parentId"
              name="parentId"
              value={formik.values.parentId}
              onChange={formik.handleChange}
              sx={{ width: "100%" }}
            >
              {PARENT_GROUP_OPTIONS.map((option) => (
                <MenuItem key={option.index} value={option.parentId}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
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
