import { FC, useEffect } from "react";
import styles from "./SelectedPost.module.scss";
import Title from "../../components/Title";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostSelectors, getSinglePost } from "../../redux/reducers/postSlice";
import { RoutesList } from "../Router";

const SelectedPost = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const singlePost = useSelector(PostSelectors.getSinglePost);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  const onHomeClick = () => {
    navigate(RoutesList.Home);
  };

  const { themeValue } = useThemeContext();

  return singlePost ? (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.breadcrumbs}>
        <span
          onClick={onHomeClick}
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
          Post {singlePost.id}
        </span>
      </div>
      <Title
        className={classNames(styles.title, {
          [styles.darkTitle]: themeValue === Theme.Dark,
        })}
        title={singlePost.title}
      />
      <img className={styles.image} src={singlePost.image} alt="image" />
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
  ) : null;
};
export default SelectedPost;
