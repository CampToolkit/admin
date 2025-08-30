import { Outlet } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useCampTabs } from "@/pages/camps/hooks/use-camp-tabs.hook.ts";

import PageTitle from "@/shared/components/PageTitle.tsx";

const TABS = [
  {
    index: 0,
    name: "Общая информация",
    path: "base-info",
  },
  {
    index: 1,
    name: "Спортсмены",
    path: "sportsmen",
  },
  {
    index: 2,
    name: "Группы",
    path: "groups",
  },
  {
    index: 3,
    name: "Локации",
    path: "locations",
  },
  {
    index: 4,
    name: "Расписание",
    path: "schedule",
  },
];

export default function CampFormPage() {
  const { currentTabIndex, handleSwitchTabs } = useCampTabs(TABS);

  return (
    <div>
      <PageTitle title="Camp Page" showBackButton={true} />
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs} sx={{ mb: 2 }}>
        {TABS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
