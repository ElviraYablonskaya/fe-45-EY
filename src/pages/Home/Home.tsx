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
import { PostSelectors, getPostList } from "../../redux/reducers/postSlice";
import { AuthSelectors } from "../../redux/reducers/authSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);

  const dispatch = useDispatch();
  const cardsList = useSelector(PostSelectors.getPostList);
  
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const { themeValue } = useThemeContext();

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
    dispatch(getPostList());
  }, []);

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
      <CardsList cardsList={cardsList} />
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
