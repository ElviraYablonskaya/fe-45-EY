import classNames from "classnames";
import styles from "./Cards.module.scss";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import LongMenu from "./menuButton";
import LikeDislikeButton from "./LikeDislikeButton";

export enum CardSize {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

type PostCardProps = {
  id?: number;
  image: string;
  text?: string;
  date: string;
  title: string;
  size: CardSize;
};

const PostCard: React.FC<PostCardProps> = ({
  image,
  text,
  date,
  title,
  size,
}) => {
  const { likeCount, dislikeCount, handleLikeClick, handleDislikeClick } =
    LikeDislikeButton({
      initialLikeCount: 0,
      initialDislikeCount: 0,
    });

  const getSizeClassName = () => {
    switch (size) {
      case CardSize.Large:
        return styles["card-large"];
      case CardSize.Medium:
        return styles["card-medium"];
      case CardSize.Small:
        return styles["card-small"];
      default:
        return "";
    }
  };

  const cardClass = classNames(styles.card, getSizeClassName());

  return (
    <div className={cardClass}>
      <div className={styles["card-date"]}>{date}</div>
      <div
        className={classNames(
          styles["card-content"],
          styles["responsive-card-content"],
          size === CardSize.Large || size === CardSize.Small
        )}
      >
        <div className={styles["card-details"]}>
          <h2
            className={
              size === CardSize.Large
                ? styles["card-title-large"]
                : size === CardSize.Medium
                ? styles["card-title-medium"]
                : styles["card-title-small"]
            }
          >
            {title}
          </h2>
          {text && <p>{text}</p>}
        </div>
        {size !== CardSize.Medium && (
          <img className={styles["card-image"]} src={image} alt="#" />
        )}
      </div>
      {size === CardSize.Medium && (
        <img className={styles["card-image"]} src={image} alt="#" />
      )}
      <div className={styles.icons}>
        <div className={styles.leftIcons}>
          <BiLike
            size={24}
            className={styles.iconMargin}
            onClick={handleLikeClick}
          />
          <span className={styles.likeCount}>{likeCount}</span>
          <BiDislike
            size={24}
            className={styles.iconMargin}
            onClick={handleDislikeClick}
          />
          <span className={styles.dislikeCount}>{dislikeCount}</span>
        </div>
        <div className={styles.rightIcons}>
          <BsBookmark size={22} className={styles.icon} />
          <div className={styles.iconMargin}>
            <LongMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
