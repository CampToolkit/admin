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
  name?: string;
  value: T;
  onChange: (e: SelectChangeEvent<T>) => void;
  label: string;
  displayEmpty?: boolean;
}

export default function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  label,
  name = "",
  displayEmpty = false,
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
        name={name}
      >
        {displayEmpty && (
          <MenuItem value={0}>
            <em>Не выбрано</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
