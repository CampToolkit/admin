import { useFormik } from "formik";

import { Box, FormControl, Grid, InputLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import CustomSelect from "@/modules/schedule/ui/custom-select/CustomSelect.tsx";

import type {
  LessonFormProps,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";

export default function LessonForm(props: LessonFormProps) {
  const { formId, initialValues, onSubmit, options } = props;

  console.log(options);
  const formik = useFormik<LessonFormValues>({
    initialValues,
    onSubmit,
  });

  const inputLabelStyles = {
    backgroundColor: "background.paper",
    px: 1,
    transform: "translate(14px, -9px) scale(0.75)",
    "&.Mui-focused": {
      color: "primary.main",
    },
  };

  return (
    <Box component="form" id={formId} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <DateTimePicker
            label="начало"
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            name="startDate"
            value={formik.values.startDate}
          />
        </Grid>
        <Grid size={6}>
          <DateTimePicker
            label="окончание"
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            name="endDate"
            value={formik.values.endDate}
          />
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="events-type-label" sx={inputLabelStyles}>
              тип тренировки
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              options={options.lessonTypeOptions}
              name="lessonTypeId"
              value={formik.values.lessonTypeId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="events-type-label" sx={inputLabelStyles}>
              тип активности
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              options={options.activityTypeOptions}
              name="activityTypeId"
              value={formik.values.activityTypeId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="events-type-label" sx={inputLabelStyles}>
              локация
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              displayEmpty={true}
              options={options.locationOptions}
              name="auditoriumId"
              value={formik.values.auditoriumId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>

        <Grid size={6}></Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="events-type-label" sx={inputLabelStyles}>
              группа
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              displayEmpty={true}
              options={options.groupOptions}
              name="groupId"
              value={formik.values.groupId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="events-type-label" sx={inputLabelStyles}>
              тренер
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              displayEmpty={true}
              options={options.coachOptions}
              name="coachId"
              value={formik.values.coachId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
