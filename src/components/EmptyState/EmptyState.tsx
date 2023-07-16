import { FC } from "react";
import styles from "./EmptyState.module.scss";
import { BsFolder } from "react-icons/bs";

type EmptyStatePropsType = {
  title: string;
  description: string;
};
const EmptyState: FC<EmptyStatePropsType> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <BsFolder size={65}/>
      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default EmptyState;
