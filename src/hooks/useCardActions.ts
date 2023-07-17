import { useDispatch } from "react-redux";
import { Post, LikeStatus } from "../@types";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "../redux/reducers/imageSlice";
import {
  setLikeStatus,
  setSaveStatus,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "../redux/reducers/postSlice";

const useCardActions = () => {
  const dispatch = useDispatch();

  const onMoreClick = (post: Post) => () => {
    dispatch(setSelectedPostModalOpened(true));
    dispatch(setSelectedPost(post));
  };

  const onImageClick = (cardsList: string) => () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(cardsList));
  };

  const onStatusClick = (card: Post) => (status: LikeStatus) => {
    dispatch(setLikeStatus({ card, status }));
  };

  const onSaveClick = (card: Post) => () => {
    dispatch(setSaveStatus({ card }));
  };
  return { onMoreClick, onImageClick, onStatusClick, onSaveClick };
};

export default useCardActions;
