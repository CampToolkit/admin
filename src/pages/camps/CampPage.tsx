import { Tab, Tabs } from "@mui/material";
import { useCampTabs } from "@/pages/camps/hooks/use-camp-tabs.hook.ts";

import BaseInfo from "./camp/sections/BaseInfo";
import Sportsmen from "@/pages/camps/camp/sections/Sportsmen.tsx";
import Groups from "./camp/sections/Groups";
import Locations from "./camp/sections/Locations";
import Schedule from "@/pages/camps/camp/sections/Schedule.tsx";
import PageTitle from "@/shared/components/PageTitle.tsx";

const TABS = [
  {
    index: 0,
    name: "Общая информация",
    path: "base-info",
    component: <BaseInfo />,
  },
  {
    index: 1,
    name: "Спортсмены",
    path: "sportsmen",
    component: <Sportsmen />,
  },
  {
    index: 2,
    name: "Группы",
    path: "groups",
    component: <Groups />,
  },
  {
    index: 3,
    name: "Локации",
    path: "locations",
    component: <Locations />,
  },
  {
    index: 4,
    name: "Расписание",
    path: "schedule",
    component: <Schedule />,
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
