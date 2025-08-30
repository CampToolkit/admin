import { type SyntheticEvent, useState } from "react";

export function useCampTabs() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleSwitchTabs = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return { currentTabIndex, handleSwitchTabs };
}
