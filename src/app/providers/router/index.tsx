import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage.tsx";
import MainLayout from "@/shared/components/layouts/MainLayout.tsx";
import CampsPage from "@/pages/camps/CampsPage";
import CampFormPage from "@/pages/camps/CampFormPage.tsx";
import GroupsForm from "@/pages/camps/camp/forms/GroupsForm.tsx";

import SportsmenForm from "@/pages/camps/camp/forms/SportsmenForm.tsx";
import Schedule from "@/pages/camps/camp/forms/Schedule";
import LocationsForm from "@/pages/camps/camp/forms/LocationsForm.tsx";
import BaseInfo from "@/pages/camps/camp/sections/BaseInfo.tsx";

const campChildren = [
  {
    path: "base-info",
    element: <BaseInfo />,
  },
  {
    path: "groups",
    element: <GroupsForm />,
  },
  {
    path: "sportsmen",
    element: <SportsmenForm />,
  },
  {
    path: "locations",
    element: <LocationsForm />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
];

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
        element: <CampFormPage />,
        children: campChildren,
      },
      {
        path: "camps/new",
        element: <CampFormPage />,
        children: campChildren,
      },
    ],
  },
]);

export { router };
