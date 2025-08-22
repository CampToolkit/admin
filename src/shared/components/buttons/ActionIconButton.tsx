import type { ReactNode } from "react";
import { IconButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

type ActionIconButtonPropsType = {
  callback: () => void;
  icon: ReactNode;
  sx?: SxProps<Theme>;
};

export default function ActionIconButton(props: ActionIconButtonPropsType) {
  return (
    <IconButton
      onClick={props.callback}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        alignItems: "right",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.light",
        },
        ...props.sx,
      }}
    >
      {props.icon}
    </IconButton>
  );
}
