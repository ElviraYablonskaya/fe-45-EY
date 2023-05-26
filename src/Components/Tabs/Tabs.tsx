import { FC, ReactElement, MouseEvent } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";

export enum TabsType {
  All = "All",
  MyFavorites = "My Favorites",
  Popular = "Popular",
}

type TabsProps = {
  type: TabsType;
  title: string | ReactElement;
  activeTab: TabsType;
  onClick: (tab: TabsType) => void;
  disabled?: boolean;
};

const Tabs: FC<TabsProps> = ({ type, title, activeTab, onClick, disabled }) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (!disabled && type !== activeTab) {
      onClick(type);
    }
  };

  const tabClasses = classNames(styles.tab, {
    [styles.tabActive]: type === activeTab,
    [styles.tabDisabled]: disabled,
  });

  return (
    <button className={tabClasses} onClick={handleClick} disabled={disabled}>
      {title}
      {type === activeTab && (
        <div
          className={classNames(styles.tabLine, {
            [styles.lineActive]: type === activeTab,
          })}
        />
      )}
    </button>
  );
};

export default Tabs;
