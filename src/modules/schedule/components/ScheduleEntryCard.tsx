import { Card } from "@mui/material";
import { baseTheme } from "@/app/providers/theme/base-theme.ts";
import {
  SLOT_HEIGHT,
  SLOTS_AMOUNT_IN_HOUR,
} from "../constants/time-table.const.ts";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ScheduleEntryCard({ children }: Props) {
  return (
    <Card
      sx={{
        position: "absolute",
        top: 0,
        minHeight: SLOT_HEIGHT * SLOTS_AMOUNT_IN_HOUR,
        borderRadius: 2,
        boxShadow: `1px 1px 5px ${baseTheme.palette.primary.light}`,
        backgroundColor: "background.default",
        minWidth: 0.5,
      }}
    >
      {children}
    </Card>
  );
}
