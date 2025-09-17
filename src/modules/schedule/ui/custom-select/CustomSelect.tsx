import {
  Box,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import type { SelectOption } from "@/modules/schedule/ui/custom-select/custom-select.type.ts";

interface Props<T> {
  options: SelectOption<T>[];
  name?: string;
  value: T;
  onChange: (e: SelectChangeEvent<T>) => void;
  label?: string;
  displayEmpty?: boolean;
  sx?: SxProps<Theme>;
}

export default function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  label,
  name = "",
  displayEmpty = false,
  sx = {},
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
          ...sx,
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
