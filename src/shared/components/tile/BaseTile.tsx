import { Box } from "@mui/material";
import type { ReactNode } from "react";

type BaseTilePropsType = {
  children: ReactNode;
};

export default function BaseTile(props: BaseTilePropsType) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",

        width: "50vw",
        maxWidth: "250px",
        height: "50vw",
        maxHeight: "250px",

        backgroundColor: "primary.light",
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 2,

        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
        "&:active": {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: "2px",
        },
      }}
    >
      {props.children}
    </Box>
  );
}
