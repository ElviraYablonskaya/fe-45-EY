import { FC } from "react";
import classNames from "classnames";

import styles from "./Title.module.scss";

type TitleProps = {
  title: string;
  className?: string;
};

const Title: FC<TitleProps> = ({ title, className }) => {
  return <div className={classNames(styles.title, className)}>{title}</div>;
};
export default Title;