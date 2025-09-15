import { Box, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
    <Box component="form" id={formId}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <CustomSelect
            label="тип тренировки"
            options={lessonTypeOptions?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            name="lessonTypeId"
            value={formik.values.lessonTypeId}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={6}>
          <CustomSelect
            label="тип активности"
            options={activityTypeOptions?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            name="activityTypeId"
            value={formik.values.activityTypeId}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={6}>
          <DateTimePicker
            label="начало"
            name="startDate"
            value={formik.values.startDate}
          />
        </Grid>
        <Grid size={6}>
          <DatePicker
            label="окончание"
            name="endDate"
            value={formik.values.endDate}
          />
        </Grid>
        <Grid size={6}>
          <CustomSelect
            displayEmpty={true}
            label="группа"
            options={groupOptions?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            name="groupId"
            value={formik.values.groupId}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={6}>
          <CustomSelect
            displayEmpty={true}
            label="тренер"
            options={coachOptions?.map((item) => ({
              label: `${item.lastName} ${item.firstName.at(0)}.${item.patrName.at(0)}.`,
              value: item.id,
            }))}
            name="coachId"
            value={formik.values.activityTypeId}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
