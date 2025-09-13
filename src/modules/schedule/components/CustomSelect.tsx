import {
  Box,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

interface Props<T> {
  options: {
    value: T;
    label: string;
  }[];
  value: T;
  onChange: (e: SelectChangeEvent<T>) => void;
  label: string;
}

export default function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: Props<T>) {
  return (
    <Box>
      <Typography variant="body2" component="div">
        {label}
      </Typography>
      <Select
        onChange={onChange}
        value={value}
        size="small"
        sx={{
          minWidth: "200px",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
