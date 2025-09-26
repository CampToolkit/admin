import Box from "@mui/system/Box";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TabHeader({ children }: Props) {
  return (
    <Box display="flex" pb={3}>
      <Box sx={{ marginLeft: "auto" }}>{children}</Box>
    </Box>
  );
}
