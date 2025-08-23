import { useState, type SyntheticEvent } from "react";
import { useCampForm } from "./use-camp-form.hook";

import { Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "@/shared/components/tabs/TabPanel";
import BaseInfo from "./BaseInfo";

import type { CampFormFormikType } from "./use-camp-form.hook";
import SportsmenForm from "./SportsmenForm";

const TAB_LABELS = [
  {
    name: "Общая информация",
  },
  {
    name: "Спортсмены",
  },
  {
    name: "Группы",
  },
  {
    name: "Расписание",
  },
];

const TAB_ELEMENT = [
  {
    index: 0,
    render: (formik: CampFormFormikType) => <BaseInfo formik={formik} />,
  },
  {
    index: 1,
    render: (formik: CampFormFormikType) => <SportsmenForm formik={formik} />,
  },
  //   {
  //     index: 2,
  //     render: (formik: CampFormFormikType) => <BaseInfo formik={formik} />,
  //   },
  //   {
  //     index: 3,
  //     render: (formik: CampFormFormikType) => <BaseInfo formik={formik} />,
  //   },
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
        {TAB_LABELS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      {TAB_ELEMENT.map((tab) => (
        <TabPanel key={tab.index} value={currentTabIndex} index={tab.index}>
          {tab.render(campForm)}
        </TabPanel>
      ))}
    </Stack>
  );
}
