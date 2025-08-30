import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage.tsx";
import MainLayout from "@/shared/components/layouts/MainLayout.tsx";
import CampsPage from "@/pages/camps/CampsPage";
import CampPage from "@/pages/camps/CampPage.tsx";
import GroupsForm from "@/pages/camps/camp/forms/GroupsForm.tsx";

import SportsmenForm from "@/pages/camps/camp/forms/SportsmenForm.tsx";
import ScheduleForm from "@/pages/camps/camp/forms/ScheduleForm.tsx";
import LocationsForm from "@/pages/camps/camp/forms/LocationsForm.tsx";
import BaseInfoSection from "@/pages/camps/camp/sections/BaseInfoSection.tsx";

const campChildren = [
  {
    path: "base-info",
    element: <BaseInfoSection />,
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
    element: <ScheduleForm />,
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
        element: <CampPage />,
        children: campChildren,
      },
      {
        path: "camps/:campId",
        element: <CampPage />,
        children: campChildren,
      },
    ],
  },
]);

export { router };
