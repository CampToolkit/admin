import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  children: ReactNode;
}

export default function SchedulePositionWrapper(props: Props) {
  const { position, children } = props;

  return (
    <Box
      sx={{
        position: "absolute",
        top: position.top,
        left: `${position.left}%`,
        height: position.height,
        width: `${position.width}%`,
      }}
    >
      {children}
    </Box>
  );
}
