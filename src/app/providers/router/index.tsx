import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage.tsx";
import MainLayout from "@/shared/components/layouts/MainLayout.tsx";
import CampsPage from "@/pages/camps/CampsPage";
import CampPage from "@/pages/camps/CampPage.tsx";
import GroupsForm from "@/pages/camps/camp/forms/GroupsForm.tsx";

import BaseInfoSection from "@/pages/camps/camp/sections/BaseInfoSection.tsx";
import LocationsSection from "@/pages/camps/camp/sections/LocationsSection.tsx";
import SportsmenSection from "@/pages/camps/camp/sections/SportsmenSection.tsx";
import ScheduleSection from "@/pages/camps/camp/sections/ScheduleSection.tsx";

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
    element: <SportsmenSection />,
  },
  {
    path: "locations",
    element: <LocationsSection />,
  },
  {
    path: "schedule",
    element: <ScheduleSection />,
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
        // children: campChildren,
      },
    ],
  },
]);

export { router };
