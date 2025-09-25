import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage.tsx";
import MainLayout from "@/common/components/layouts/MainLayout.tsx";
import CampsPage from "@/pages/camps/CampsPage";
import CampPage from "@/pages/camps/CampPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "camps",
        element: <CampsPage />,
      },
      {
        path: "camps/:campId",
        element: <CampPage />,
      },
    ],
  },
]);

export { router };
