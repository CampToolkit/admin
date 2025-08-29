import { FieldArray, FormikProvider } from "formik";
import {
  Stack,
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";

import type { TabPropsType } from "../CampForm";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";

export default function Schedule({ formik }: TabPropsType) {
  const auditoriumTypes = [
    { value: "ice-rink", label: "Лед" },
    { value: "gym", label: "Зал офп" },
    { value: "choreography-hall", label: "Зал хореографии" },
  ];

  const slotType = [
    { value: 1, label: "Основная" },
    { value: "2", label: "Дополнительная" },
  ];

  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LeftLayoutItem>
            <FieldArray name="groups">
              {({ push, remove }) => (
                <>
                  {formik.values.groups.map((_, index) => (
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
                          value={dayjs(new Date())}
                          onChange={() => {}}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TimePicker
                          label="Начало"
                          value={dayjs(`2024-01-01T${"00:00"}`)}
                          onChange={() => {}}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TimePicker
                          label="Окончание"
                          value={dayjs(`2024-01-01T${"00:00"}`)}
                          onChange={() => {}}
                        />
                      </Grid>
                      <Grid size={2}>
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
                            Локация
                          </InputLabel>
                          <Select
                            labelId="auditorium-type-label"
                            // value={selectedType}
                            label="Локация"
                            // onChange={}
                          >
                            {auditoriumTypes.map((type) => (
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
                  <Button type="button" onClick={() => push({ name: "" })}>
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

              <ManageFormButtonsBlock
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
