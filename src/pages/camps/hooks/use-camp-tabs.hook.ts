import { type SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function useCampTabs(TABS: { name: string; path: string }[]) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { campId } = useParams();

  const handleSwitchTabs = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
    navigate(`/camps/${campId}/${TABS[newValue].path}`);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    if (TABS.some((tab) => tab.path === currentPath)) {
      const index = TABS.findIndex((tab) => tab.path === currentPath);
      setCurrentTabIndex(index);
    } else {
      navigate(`/camps/${campId}/${TABS[0].path}`);
      setCurrentTabIndex(0);
    }
  }, [campId, TABS, navigate]);

  return { currentTabIndex, handleSwitchTabs };
}
