import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#1976d2",
          fontWeight: 500,
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

export { baseTheme };
