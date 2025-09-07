import {
  Button,
  Stack,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { FieldArray, FormikProvider, useFormik } from "formik";

import TabLayout from "../../components/forms-layouts/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/components/forms-layouts/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/components/forms-layouts/RightLayoutItem.tsx";
import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";
import type { SelectOption } from "@/pages/camps/camp/forms/group/select-options.type.ts";

export interface GroupsFormValues {
  groups: {
    name: string;
    parentId: number;
  }[];
}

const defaultItem = {
  name: "",
  parentId: 0,
};

const initialValues: GroupsFormValues = {
  groups: [defaultItem],
};

interface Props {
  selectOptions: SelectOption[];
  onSubmit: (values: GroupsFormValues) => void;
}

export default function GroupsForm(props: Props) {
  const { selectOptions, onSubmit } = props;

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
                    {/* todo сделать название поля в рамке поля*/}
                    <Grid size={5}>
                      <div>Название группы</div>
                      <TextField
                        size="small"
                        fullWidth
                        label="Название"
                        name={`groups.${index}.name`}
                        value={formik.values.groups[index].name}
                        onChange={(event) => formik.handleChange(event)}
                      />
                    </Grid>
                    {/* todo сделать название поля в рамке поля*/}
                    <Grid size={5}>
                      <div>Родительская группа</div>
                      <Select
                        displayEmpty
                        size="small"
                        labelId="status-select-label"
                        name={`groups[${index}].parentId`}
                        value={formik.values.groups[index].parentId}
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
