import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage.tsx";
import MainLayout from "@/shared/components/layouts/MainLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export { router };
