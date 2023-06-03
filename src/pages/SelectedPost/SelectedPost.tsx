import { FC } from "react";
import styles from "./SelectedPost.module.scss";
import Title from "../../components/Title";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";

type SelectedPostProps = {
  title: string;
  image: string;
  description: string;
};

const SelectedPost: FC<SelectedPostProps> = ({ image, description, title }) => {
  const paragraphs = description
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span>Home</span>
        <span className={styles.breadcrumbSeparator}>|</span>
        <span className={styles.numberPost}>Post 14278</span>
      </div>
      <Title className={styles.title} title={title} />
      <img className={styles.image} src={image} alt="image" />
      {paragraphs}
      <div className={styles.iconsButtons}>
        <div className={styles.leftButtons}>
          <BiLike size={25} className={styles.likeButton} />
          <BiDislike size={25} className={styles.dislikeButton} />
        </div>
        <div className={styles.addToFavorites}>
          <FaRegBookmark size={25} className={styles.bookMarkButton} />
          {"Add to favorites"}
        </div>
      </div>
    </div>
  );
};
export default SelectedPost;
