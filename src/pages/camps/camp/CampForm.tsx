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
    render: (formik: CampFormFormikType) => <BaseInfo formik={formik} />,
  },
  {
    index: 1,
    name: "Спортсмены",
    render: (formik: CampFormFormikType) => <SportsmenForm formik={formik} />,
  },
  {
    index: 2,
    name: "Группы",
    render: (formik: CampFormFormikType) => <GroupsForm formik={formik} />,
  },
  {
    index: 3,
    name: "Локации",
    render: (formik: CampFormFormikType) => <LocationsForm formik={formik} />,
  },
  {
    index: 4,
    name: "Расписание",
    render: (formik: CampFormFormikType) => <Schedule formik={formik} />,
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
