import {
  PostSelectors,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "../../../redux/reducers/postSlice";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardTypes } from "../../../components/Card";

const SelectedPostModal = () => {
  const isOpened = useSelector(PostSelectors.getSelectedPostModalOpened);
  const selectedPost = useSelector(PostSelectors.getSelectedPost);

  const dispatch = useDispatch();
  const onCloseModal = () => {
    dispatch(setSelectedPostModalOpened(false));
    dispatch(setSelectedPost(null));
  };


  return selectedPost ? (
    <Modal isOpen={isOpened} onClose={onCloseModal}>
      <Card type={CardTypes.Large} {...selectedPost} onStatusClick={(_) => {}} />
    </Modal>
  ) : null;
};

export default SelectedPostModal;
