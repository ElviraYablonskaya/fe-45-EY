import { FC } from "react";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import styles from "./Title.module.scss";
import { Theme } from "../../@types";

type TitleProps = {
  title: string;
  className?: string;
};

const Title: FC<TitleProps> = ({ title, className }) => {
  const { themeValue } = useThemeContext();

  return <div className={classNames(styles.title, className, {[
    styles.darkTitle]: themeValue === Theme.Dark})}>{title}</div>;
};
export default Title;
