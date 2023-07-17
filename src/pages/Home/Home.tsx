import { useEffect, useMemo, useState } from "react";

import CardsList from "../../components/CardsList";
import { TabsTypes, Theme } from "../../@types";

import styles from "./Home.module.scss";
import Title from "../../components/Title";
import TabsList from "../../components/TabsList";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import SelectedPostModal from "./SelectedPostModal/SelectedPostModal";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSelectors,
  getMyPosts,
  getPostList,
} from "../../redux/reducers/postSlice";
import { AuthSelectors } from "../../redux/reducers/authSlice";
import { PER_PAGE } from "../../utils/constants";
import Paginate from "../../components/Pagination";

const Home = () => {
  // текущая страница
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(TabsTypes.All);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const totalCount = useSelector(PostSelectors.getTotalPostsCount);
  const allPosts = useSelector(PostSelectors.getPostList);
  const myPosts = useSelector(PostSelectors.getMyPosts);

  const { themeValue } = useThemeContext();

  //сколько страниц
  const pagesCount = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Popular, title: "Popular Posts", disabled: false },
      {
        key: TabsTypes.MyPosts,
        title: "My Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  useEffect(() => {
    //сколько постов просмотрено
    const offset = (currentPage - 1) * PER_PAGE;
    dispatch(getPostList({ offset: offset, isOverwrite: true }));
  }, [currentPage]);

  useEffect(() => {
    const offset = (currentPage - 1) * PER_PAGE;
    if (activeTab === TabsTypes.MyPosts) {
      dispatch(getMyPosts());
    } else {
      dispatch(getPostList({ offset, isOverwrite: true }));
    }
  }, [activeTab, currentPage]);

  const postsClick = () => {
    if (activeTab === TabsTypes.MyPosts) {
      return myPosts;
    } else {
      return allPosts;
    }
  };

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <Title title={"Blog"} className={styles.pageTitle} />
      <TabsList
        tabsList={tabsList}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
      <CardsList cardsList={postsClick()} />
      <Paginate
        currentPage={currentPage}
        pagesCount={pagesCount}
        onPageChange={onPageChange}
      />
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
