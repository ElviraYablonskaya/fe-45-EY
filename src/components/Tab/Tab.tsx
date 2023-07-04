import { FC, ReactElement } from "react";
import classNames from "classnames";

import styles from "./Tab.module.scss";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";


type TabsProps = {
  title: string | ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
};

const Tab: FC<TabsProps> = ({ title, onClick, disabled, active }) => {
  const { themeValue } = useThemeContext();
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.tab, {
        [styles.active]: active,
        [styles.disabled]: disabled,
        [styles.darkTab]: themeValue === Theme.Dark,
      })}
    >
      {title}
    </div>
  );
};
export default Tab;
