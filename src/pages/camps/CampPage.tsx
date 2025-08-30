import PageTitle from "@/shared/components/PageTitle.tsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";

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

export default function CampPage() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const { campId = "new" } = useParams();
  const handleSwitchTabs = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
    navigate(`/camps/${campId}/${TABS[newValue].path}`);
  };
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
