import { useState, type SyntheticEvent } from "react";
import { useCampForm } from "./use-camp-form.hook";

import { Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "@/shared/components/tabs/TabPanel";
import BaseInfo from "./forms/BaseInfo";

import type { CampFormFormikType } from "./use-camp-form.hook";
import SportsmenForm from "./forms/SportsmenForm";
import GroupsForm from "./forms/GroupsForm";
import Schedule from "./forms/Schedule";
import LocationsForm from "./forms/LocationsForm";

const TABS = [
  {
    index: 0,
    name: "Общая информация",
  },
  {
    index: 1,
    name: "Спортсмены",
  },
  {
    index: 2,
    name: "Группы",
  },
  {
    index: 3,
    name: "Локации",
  },
  {
    index: 4,
    name: "Расписание",
  },
];

export type TabPropsType = {
  formik: CampFormFormikType;
};

export default function CampForm() {
  const campForm = useCampForm();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleSwitchTabs = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs}>
        {TABS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      {TABS.map((tab) => (
        <TabPanel key={tab.index} value={currentTabIndex} index={tab.index}>
          {tab.render(campForm)}
        </TabPanel>
      ))}
    </Stack>
  );
}
