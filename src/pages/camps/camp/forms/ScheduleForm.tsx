import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  Stack,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import TabLayout from "../components/forms-layouts/TabLayout.tsx";
import LeftLayoutItem from "@/pages/camps/camp/components/forms-layouts/LeftLayoutItem.tsx";
import RightLayoutItem from "@/pages/camps/camp/components/forms-layouts/RightLayoutItem.tsx";

import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";

const auditoriums = [
  { value: 1, label: "Лед" },
  { value: 2, label: "Зал офп" },
  { value: 3, label: "Зал хореографии" },
];

const lessonType = [
  { value: 1, label: "Основная" },
  { value: 2, label: "Дополнительная" },
];

interface LessonItem {
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  sessionTypeId: number;
  locationId: number;
}

interface ScheduleFormValues {
  lessons: LessonItem[];
}

const defaultItem = {
  date: dayjs(),
  startTime: dayjs().set("hour", 0).set("minute", 0),
  endTime: dayjs().set("hour", 0).set("minute", 0),
  sessionTypeId: 1,
  locationId: 1,
};

const initialValues: ScheduleFormValues = {
  lessons: [defaultItem],
};

export default function ScheduleForm() {
  const formik = useFormik<ScheduleFormValues>({
    initialValues,
    onSubmit: (values: ScheduleFormValues) => {
      console.log(values);
    },
  });
  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LeftLayoutItem>
            <FieldArray name="lessons">
              {({ push, remove }) => (
                <>
                  {formik.values.lessons.map((_, index) => (
                    <Grid
                      container
                      key={index}
                      alignItems="center"
                      columnSpacing={1}
                      sx={{ mb: 1 }}
                    >
                      <Grid size={2}>
                        <DatePicker
                          label="Дата"
                          name={`formik.values.lessons${index}.date`}
                          value={formik.values.lessons[index].date}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TimePicker
                          label="Начало"
                          name={`formik.values.lessons${index}.date`}
                          value={formik.values.lessons[index].date}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TimePicker
                          label="Окончание"
                          name={`formik.values.lessons${index}.date`}
                          value={formik.values.lessons[index].date}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={2}>
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
                            Тип тренировки
                          </InputLabel>
                          <Select
                            labelId="session-type-label"
                            label="session-type"
                            name={`lessons[${index}].sessionTypeId`}
                            value={formik.values.lessons[index].sessionTypeId}
                            onChange={formik.handleChange}
                          >
                            {lessonType.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={3}>
                        <FormControl fullWidth>
                          <InputLabel
                            id="auditorium-type-label"
                            sx={{
                              backgroundColor: "background.paper",
                              px: 1,
                              transform: "translate(14px, -9px) scale(0.75)",
                              "&.Mui-focused": {
                                color: "primary.main",
                              },
                            }}
                          >
                            Место проведения
                          </InputLabel>
                          <Select
                            labelId="auditorium-type-label"
                            label="Место"
                            name={`lessons[${index}].locationId`}
                            value={formik.values.lessons[index].locationId}
                            onChange={formik.handleChange}
                          >
                            {auditoriums.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={1}>
                        <Button color="error" onClick={() => remove(index)}>
                          ✕
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                  <Button type="button" onClick={() => push(defaultItem)}>
                    Добавить слот
                  </Button>
                </>
              )}
            </FieldArray>
          </LeftLayoutItem>

          <RightLayoutItem>
            <>
              <Stack gap={1} mb={3}>
                <Button variant="outlined">Загрузить из файла</Button>
                <Button variant="outlined">Загрузить из базы данных</Button>
              </Stack>

              <FormActions
                saveCallback={formik.handleSubmit}
                clearCallback={formik.handleReset}
              />
            </>
          </RightLayoutItem>
        </LocalizationProvider>
      </FormikProvider>
    </TabLayout>
  );
}
