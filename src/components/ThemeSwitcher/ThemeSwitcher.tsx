import classNames from "classnames";

import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";
import { BsSun } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";

import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { themeValue, onChangeTheme } = useThemeContext();

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Light,
        })}
        onClick={onChangeTheme(Theme.Light)}
      >
        <BsSun />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Dark,
        })}
        onClick={onChangeTheme(Theme.Dark)}
      >
        <BiMoon />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
