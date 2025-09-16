import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers/router";
import AppThemeProvider from "./providers/theme/ThemeProvider";
import { ModalProvider } from "@/app/providers/contexts/global-modal/ModalProvider.tsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </LocalizationProvider>
    </AppThemeProvider>
  </StrictMode>,
);
