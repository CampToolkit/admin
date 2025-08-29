import { Stack } from "@mui/material";
import type { ReactNode } from "react";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        minHeight: "100%",
      }}
    >
      {children}
    </Stack>
  );
}
