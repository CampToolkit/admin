import {
  Button,
  Stack,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { FieldArray, FormikProvider, useFormik } from "formik";

import TabLayout from "../components/forms-layouts/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/components/forms-layouts/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/components/forms-layouts/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";

export interface GroupsFormValues {
  groups: {
    name: string;
    parentId: number | null;
  }[];
}

const defaultItem = {
  name: "",
  parentId: 1,
};

const initialValues: GroupsFormValues = {
  groups: [defaultItem],
};

const PARENT_GROUP_OPTIONS = [
  {
    index: 1,
    value: 1,
    name: "основная",
  },
  {
    index: 2,
    value: 2,
    name: "parent1",
  },
  {
    index: 3,
    value: 3,
    name: "parent2",
  },
];

interface Props {
  onSubmit: (values: GroupsFormValues) => void;
}

export default function GroupsForm(props: Props) {
  const { onSubmit } = props;

  const formik = useFormik<GroupsFormValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });
  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LeftLayoutItem>
          <FieldArray name="groups">
            {({ push, remove }) => (
              <>
                {formik.values.groups.map((_, index) => (
                  <Grid
                    container
                    key={index}
                    alignItems="center"
                    columnSpacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Grid size={5}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Название"
                        name={`groups.${index}.name`}
                        value={formik.values.groups[index].name}
                        onChange={(event) => formik.handleChange(event)}
                      />
                    </Grid>
                    <Grid size={5}>
                      <Select
                        size="small"
                        labelId="status-select-label"
                        name={`groups[${index}].parentId`}
                        value={formik.values.groups[index].parentId}
                        onChange={(event) => formik.handleChange(event)}
                        sx={{ width: "100%" }}
                      >
                        {PARENT_GROUP_OPTIONS.map((option) => (
                          <MenuItem key={option.index} value={option.index}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid size={1}>
                      <Button color="error" onClick={() => remove(index)}>
                        ✕
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button type="button" onClick={() => push(defaultItem)}>
                  Добавить группу
                </Button>
              </>
            )}
          </FieldArray>
        </LeftLayoutItem>

        <RightLayoutItem>
          <>
            <Stack gap={1} mb={3}>
              <Button variant="outlined">Загрузить из базы данных</Button>
            </Stack>
            <FormActions
              saveCallback={formik.handleSubmit}
              clearCallback={formik.handleReset}
            />
          </>
        </RightLayoutItem>
      </FormikProvider>
    </TabLayout>
  );
}
