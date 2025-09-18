import { type Dayjs } from "dayjs";

import { Box, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface Props {
  value: Dayjs;
  minValue?: Dayjs;
  maxValue?: Dayjs;
  onChange: (value: Dayjs | null) => void;
}

export default function DateNavigator(props: Props) {
  const { value, minValue, maxValue, onChange } = props;

  const goToPreviousDay = () => onChange(value.subtract(1, "day"));
  const goToNextDay = () => onChange(value.add(1, "day"));

  const isPrevDisabled = minValue ? value.isBefore(minValue, "day") : false;
  const isNextDisabled = maxValue ? value.isAfter(maxValue, "day") : false;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <IconButton disabled={isPrevDisabled} onClick={goToPreviousDay}>
        <ArrowBackIcon />
      </IconButton>
      <DatePicker
        value={value}
        onChange={onChange}
        minDate={minValue}
        maxDate={maxValue}
        slotProps={{
          textField: {
            size: "small",
          },
        }}
      />
      <IconButton disabled={isNextDisabled} onClick={goToNextDay}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
}
