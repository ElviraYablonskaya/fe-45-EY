import { FC } from "react";
import classNames from "classnames";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsBookmark, BsThreeDots, BsBookmarkFill } from "react-icons/bs";

import styles from "./Card.module.scss";
import { LikeStatus, Theme } from "../../@types";
import { useThemeContext } from "../../context/Theme";
import { useSelector } from "react-redux";
import { PostSelectors } from "../../redux/reducers/postSlice";

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
  onMoreClick?: () => void;
  onImageClick?: () => void;
  onStatusClick: (status: LikeStatus) => void;
  onSaveClick?: () => void;
};

const Card: FC<CardProps> = ({
  id,
  type,
  date,
  title,
  text,
  image,
  onMoreClick,
  onImageClick,
  onStatusClick,
  onSaveClick,
}) => {
  const cardStyle = styles[type];
  const { themeValue } = useThemeContext();
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((item) => item.id === id);
  const dislikedIndex = dislikedPosts.findIndex((item) => item.id === id);
  const savePosts = useSelector(PostSelectors.getSavePosts);
  const saveIndex = savePosts.findIndex((item) => item.id === id);
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
          <img src={image} alt="#" onClick={onImageClick} />
        </div>
      </div>
      <div className={styles.cardReaction}>
        <div
          className={classNames(styles.cardReactionLikeDislike, {
            [styles.darkcardReaction]: themeValue === Theme.Dark,
          })}
        >
          <div  className={styles.likeStatus} onClick={() => onStatusClick(LikeStatus.Like)}>
            <BiLike size={22} /> {likedIndex > -1 && <span>1</span>}
          </div>
          <div className={styles.likeStatus} onClick={() => onStatusClick(LikeStatus.Dislike)}>
            <BiDislike size={22} /> {dislikedIndex > -1 && 1}
          </div>
        </div>
        <div
          className={classNames(styles.cardReactionNavigation, {
            [styles.darkCardReactionNavigation]: themeValue === Theme.Dark,
          })}
        >
          <div onClick={onSaveClick}>
            {saveIndex > -1 ? (
              <BsBookmarkFill size={22} />
            ) : (
              <BsBookmark size={22} />
            )}
          </div>
          {onMoreClick && (
            <div onClick={onMoreClick}>
              <BsThreeDots size={22} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
