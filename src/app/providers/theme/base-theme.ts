import { createTheme } from "@mui/material/styles";
import { indigo, deepOrange } from "@mui/material/colors";

const baseTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
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
