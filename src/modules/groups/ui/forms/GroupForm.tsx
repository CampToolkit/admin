import LeftLayoutItem from "@/pages/camp/components/forms-layouts/LeftLayoutItem.tsx";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField } from "@mui/material";
import RightLayoutItem from "@/pages/camp/components/forms-layouts/RightLayoutItem.tsx";
import FormActions from "@/pages/camp/components/forms-layouts/FormActions.tsx";
import TabLayout from "@/pages/camp/components/forms-layouts/TabLayout.tsx";
import { useFormik } from "formik";
import type { SelectOption } from "@/modules/groups/ui/forms/select-options.type.ts";

export interface GroupFormValues {
  id: number;
  name: string;
  parentId: number | null;
}

interface Props {
  initialValues: GroupFormValues;
  selectOptions: SelectOption[];
  onSubmit: (values: GroupFormValues) => void;
}

export default function GroupForm(props: Props) {
  const { initialValues, selectOptions, onSubmit } = props;
  const formik = useFormik<GroupFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });

  console.log("initialValues.parentId", initialValues.parentId);
  console.log("selectOptions", selectOptions);
  return (
    <TabLayout>
      <LeftLayoutItem>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={6}>
            <div>Название группы</div>
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
            <div>Родительская группа</div>
            <Select
              displayEmpty
              size="small"
              labelId="parentId"
              name="parentId"
              value={formik.values.parentId}
              onChange={formik.handleChange}
              sx={{ width: "100%" }}
            >
              <MenuItem value={0}>
                <em>Не выбрано</em>
              </MenuItem>
              {selectOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
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
