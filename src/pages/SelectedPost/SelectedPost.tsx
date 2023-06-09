import { FC } from "react";
import styles from "./SelectedPost.module.scss";
import Title from "../../components/Title";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

type SelectedPostProps = {
  title: string;
  image: string;
  description: string;
};

const SelectedPost: FC<SelectedPostProps> = ({ image, description, title }) => {
  const { themeValue } = useThemeContext();

  const paragraphs = description.split("\n").map((paragraph, index) => (
    <p
      className={classNames(styles.paragraph, {
        [styles.darkParagraph]: themeValue === Theme.Dark,
      })}
      key={index}
    >
      {paragraph}
    </p>
  ));

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.breadcrumbs}>
        <span
          className={classNames(styles.breadcrumbs, {
            [styles.darkBreadCrumps]: themeValue === Theme.Dark,
          })}
        >
          Home
        </span>
        <span
          className={classNames(styles.breadcrumbSeparator, {
            [styles.darkBreadcrumbSeparator]: themeValue === Theme.Dark,
          })}
        >
          |
        </span>
        <span
          className={classNames(styles.numberPost, {
            [styles.darkNumberPost]: themeValue === Theme.Dark,
          })}
        >
          Post 14278
        </span>
      </div>
      <Title
        className={classNames(styles.title, {
          [styles.darkTitle]: themeValue === Theme.Dark,
        })}
        title={title}
      />
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
