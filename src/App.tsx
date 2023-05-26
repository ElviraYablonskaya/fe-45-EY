import { useState } from "react";
import SignIn, { TitleType } from "./Components/SignIn";
import Tabs from "./Components/Tabs"
import { TabsType } from "./Components/Tabs/Tabs";
import styles from "./Components/Tabs/Tabs.module.scss";

const tabsData = [
  { type: TabsType.All, title: "All" },
  { type: TabsType.MyFavorites, title: "My Favorites" },
  { type: TabsType.Popular, title: "Popular" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.All);
  const handleTabClick = (tab: TabsType) => {
    setActiveTab(tab);
  };
  const tabsContainerClasses = styles.tabsContainer;
  return (
    <>
      <div>
        <SignIn type={TitleType.SignIn} />
        <div className={tabsContainerClasses}>
          {tabsData.map((tab) => (
            <Tabs
              key={tab.type}
              type={tab.type}
              title={tab.title}
              onClick={handleTabClick}
              activeTab={activeTab}
              disabled={tab.type === TabsType.Popular}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;