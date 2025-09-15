import { Box, FormControl, Grid, InputLabel } from "@mui/material";

import { useFormik } from "formik";
import { Dayjs } from "dayjs";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import type { Coach } from "@/shared/api/coach/CoachApi.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type { LessonType } from "@/shared/api/LessonTypeApi.type.ts";
import CustomSelect from "@/modules/schedule/components/CustomSelect.tsx";
import { DateTimePicker } from "@mui/x-date-pickers";

export interface LessonFormValues {
  startDate: Dayjs;
  endDate: Dayjs;
  lessonTypeId: number;
  activityTypeId: number;
  auditoriumId: number;
  coachId: number;
  groupId: number;
}

export type LessonFormProps = {
  formId: string;
  initialValues: LessonFormValues;
  onSubmit: (values: LessonFormValues) => void;
  lessonTypeOptions: LessonType[];
  activityTypeOptions: ActivityType[];
  groupOptions: Group[];
  coachOptions: Coach[];
};

export default function LessonForm(props: LessonFormProps) {
  const {
    formId,
    initialValues,
    onSubmit,
    lessonTypeOptions,
    activityTypeOptions,
    coachOptions,
    groupOptions,
  } = props;
  const formik = useFormik<LessonFormValues>({
    initialValues,
    onSubmit,
  });

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
            <InputLabel
              id="session-type-label"
              sx={{
                backgroundColor: "background.paper",
                px: 1,
                transform: "translate(14px, -9px) scale(0.75)",
                "&.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              тип тренировки
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              options={lessonTypeOptions?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              name="lessonTypeId"
              value={formik.values.lessonTypeId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel
              id="session-type-label"
              sx={{
                backgroundColor: "background.paper",
                px: 1,
                transform: "translate(14px, -9px) scale(0.75)",
                "&.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              тип активности
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              options={activityTypeOptions?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              name="activityTypeId"
              value={formik.values.activityTypeId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel
              id="session-type-label"
              sx={{
                backgroundColor: "background.paper",
                px: 1,
                transform: "translate(14px, -9px) scale(0.75)",
                "&.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              группа
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              displayEmpty={true}
              options={groupOptions?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              name="groupId"
              value={formik.values.groupId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel
              id="session-type-label"
              sx={{
                backgroundColor: "background.paper",
                px: 1,
                transform: "translate(14px, -9px) scale(0.75)",
                "&.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              тренер
            </InputLabel>
            <CustomSelect
              sx={{ width: "100%" }}
              displayEmpty={true}
              options={coachOptions?.map((item) => ({
                label: `${item.lastName} ${item.firstName.at(0)}.${item.patrName.at(0)}.`,
                value: item.id,
              }))}
              name="coachId"
              value={formik.values.activityTypeId}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
