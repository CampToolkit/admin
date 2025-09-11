import { Tab, Tabs } from "@mui/material";
import { useCampTabs } from "@/pages/camps/hooks/use-camp-tabs.hook.ts";

import PageTitle from "@/shared/components/PageTitle.tsx";

import BaseInfoSection from "@/pages/camps/camp/sections/BaseInfoSection.tsx";
import SportsmenSection from "@/pages/camps/camp/sections/SportsmenSection.tsx";
import GroupsSection from "@/pages/camps/camp/sections/GroupsSection.tsx";
import LocationsSection from "@/pages/camps/camp/sections/LocationsSection.tsx";
import ScheduleSection from "@/pages/camps/camp/sections/ScheduleSection.tsx";
import ExampleSection from "./camp/sections/ExampleSection.tsx";

const TABS = [
  {
    index: 0,
    name: "Общая информация",
    path: "base-info",
    component: <BaseInfoSection />,
  },
  {
    index: 1,
    name: "Спортсмены",
    path: "sportsmen",
    component: <SportsmenSection />,
  },
  {
    index: 2,
    name: "Группы",
    path: "groups",
    component: <GroupsSection />,
  },
  {
    index: 3,
    name: "Локации",
    path: "locations",
    component: <LocationsSection />,
  },
  {
    index: 4,
    name: "Расписание",
    path: "schedule",
    component: <ScheduleSection />,
  },
  {
    index: 5,
    name: "Example",
    path: "example",
    component: <ExampleSection />,
  },
];

export default function CampPage() {
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();

  return (
    <div>
      <PageTitle title="Camp Page" showBackButton={true} />
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs} sx={{ mb: 2 }}>
        {TABS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <div>{TABS[currentTabIndex].component}</div>
    </div>
  );
}
