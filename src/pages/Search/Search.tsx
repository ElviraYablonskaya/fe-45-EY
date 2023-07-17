import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSelectors,
  getSearchedPosts,
} from "../../redux/reducers/postSlice";
import Title from "../../components/Title";
import Card, { CardTypes } from "../../components/Card";
import { useCardActions } from "../../hooks";
import styles from "./Search.module.scss";
import EmptyState from "../../components/EmptyState";
import InfiniteScroll from "react-infinite-scroll-component";
import { PER_PAGE } from "../../utils/constants";

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const totalPosts = useSelector(PostSelectors.getTotalSearchedPosts);

  const { onMoreClick, onImageClick, onStatusClick, onSaveClick } =
    useCardActions();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getSearchedPosts({ search, offset }));
    }
  }, [search, currentPage]);

  const onNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={styles.container} id="scrollableDiv">
        {searchedPosts.length ? (
          <InfiniteScroll
            next={onNextClick}
            loader={""}
            scrollThreshold={0.7}
            hasMore={searchedPosts.length < totalPosts}
            dataLength={searchedPosts.length}
            scrollableTarget="scrollableDiv"
          >
            {searchedPosts.map((post) => {
              return (
                <Card
                  key={post.id}
                  type={CardTypes.Search}
                  onStatusClick={onStatusClick(post)}
                  onSaveClick={onSaveClick(post)}
                  onImageClick={onImageClick(post.image)}
                  onMoreClick={onMoreClick(post)}
                  {...post}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <EmptyState
            title={"Nothing was found..."}
            description={"Try another search request"}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
