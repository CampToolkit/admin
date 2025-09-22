import BaseInfoSection from "@/pages/camps/camp/sections/BaseInfoSection.tsx";
import SportsmenSection from "@/pages/camps/camp/sections/SportsmenSection.tsx";
import GroupsSection from "@/pages/camps/camp/sections/GroupsSection.tsx";
import LocationsSection from "@/pages/camps/camp/sections/LocationsSection.tsx";
import ScheduleSection from "@/modules/schedule/ui/ScheduleSection.tsx";
import ExampleSection from "@/pages/camps/camp/sections/ExampleSection.tsx";
import { useCampTabs } from "@/pages/camps/hooks/use-camp-tabs.hook.ts";
import PageTitle from "@/shared/components/PageTitle.tsx";
import { Box, Tab, Tabs } from "@mui/material";
import type { ComponentType } from "react";
import CoachesSection from "@/modules/coaches/ui/CoachesSection.tsx";

interface CampTab {
  name: string;
  path: string;
  component: ComponentType;
}

const TABS: CampTab[] = [
  {
    name: "Общая информация",
    path: "base-info",
    component: BaseInfoSection,
  },
  {
    name: "Тренеры",
    path: "coaches",
    component: CoachesSection,
  },
  {
    name: "Спортсмены",
    path: "sportsmen",
    component: SportsmenSection,
  },
  {
    name: "Группы",
    path: "groups",
    component: GroupsSection,
  },
  {
    name: "Локации",
    path: "locations",
    component: LocationsSection,
  },
  {
    name: "Расписание",
    path: "schedule",
    component: ScheduleSection,
  },
  {
    name: "Example",
    path: "example",
    component: ExampleSection,
  },
];
export default function Camp() {
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = TABS[currentTabIndex].component;

  return (
    <div>
      <PageTitle title="Camp Page" showBackButton={true} />
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs} sx={{ mb: 2 }}>
        {TABS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <Box>
        <CurrentComponent />
      </Box>
    </div>
  );
}
