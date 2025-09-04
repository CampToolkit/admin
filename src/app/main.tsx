import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers/router";
import AppThemeProvider from "./providers/theme/ThemeProvider";
import { ModalProvider } from "@/app/providers/contexts/global-modal/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </AppThemeProvider>
  </StrictMode>,
);
