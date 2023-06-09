import { FC } from "react";
import classNames from "classnames";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

import styles from "./Card.module.scss";
import { Theme } from "../../@types";
import { useThemeContext } from "../../context/Theme";

export enum CardTypes {
  Large = "large",
  Medium = "medium",
  Small = "small",
}
type CardProps = {
  type: CardTypes;
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num?: number;
  title: string;
  author?: number;
};

const Card: FC<CardProps> = ({
  type,
  id,
  date,
  title,
  text,
  image,
  lesson_num,
  author,
}) => {
  const cardStyle = styles[type];
  const { themeValue } = useThemeContext();
  return (
    <div className={classNames(cardStyle)}>
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <span className={styles.date}>{date}</span>
          <div
            className={classNames(styles.cardTitle, {
              [styles.darkCardTitle]: themeValue === Theme.Dark,
            })}
          >
            {title}
          </div>
          {type === CardTypes.Large && (
            <div className={styles.cardText}>{text}</div>
          )}
        </div>
        <div className={styles.cardImage}>
          <img src={image} alt="#" />
        </div>
      </div>
      <div className={styles.cardReaction}>
        <div className={classNames(styles.cardReationLikeDislike, {
          [styles.darkcardReaction]: themeValue === Theme.Dark
        })}>
          <BiLike size={22} />
          <BiDislike size={22} />
        </div>
        <div className={classNames(styles.cardReacrionNavigation, {
          [styles.darkCardReacrionNavigation]: themeValue === Theme.Dark
        })}>
          <BsBookmark size={22} />
        </div>
      </div>
    </div>
  );
};

export default Card;
