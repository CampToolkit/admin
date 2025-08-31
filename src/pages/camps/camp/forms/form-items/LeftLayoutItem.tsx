import { Box } from "@mui/material";
import type { ReactNode } from "react";

export default function LeftLayoutItem({ children }: { children: ReactNode }) {
  return <Box sx={{ flexGrow: 2 }}>{children}</Box>;
}
