import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";

dayjs.locale("ru");

interface BaseInfoFormValues {
  name: string;
  startDate: Dayjs;
  endDate: Dayjs;
  city: string;
}

const initialValues = {
  name: "",
  startDate: dayjs(),
  endDate: dayjs(),
  city: "",
};

export default function BaseInfo() {
  const formik = useFormik<BaseInfoFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <TabLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
        <LeftLayoutItem>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid size={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Название"
                  name="name"
                  value={formik.values.name}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Дата начала"
                  name={`formik.values.startDate`}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Дата окончания"
                  name={`formik.values.endDate`}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Город"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </LeftLayoutItem>

        <RightLayoutItem>
          <ManageFormButtonsBlock
            saveCallback={formik.handleSubmit}
            clearCallback={formik.handleReset}
          />
        </RightLayoutItem>
      </LocalizationProvider>
    </TabLayout>
  );
}
