import { useEffect } from "react";
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

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const { onMoreClick, onImageClick, onStatusClick, onSaveClick } =
    useCardActions();

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      dispatch(getSearchedPosts(search));
    }
  }, [search]);
  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={styles.container}>
      {searchedPosts.length ? (
          <>
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
          </>
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
