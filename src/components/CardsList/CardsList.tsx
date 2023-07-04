import { FC } from "react";

import { LikeStatus, Post, PostsList } from "../../@types";

import Posts from "../Card";
import styles from "./CardsList.module.scss";
import { CardTypes } from "../Card/Card";
import { useDispatch } from "react-redux";
import {
  setLikeStatus,
  setSaveStatus,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "../../redux/reducers/postSlice";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "../../redux/reducers/imageSlice";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
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

  return cardsList.length ? (
    <div className={styles.cardListContainer}>
      <div className={styles.cardListWrap}>
        <Posts
          type={CardTypes.Large}
          {...cardsList[0]}
          onMoreClick={onMoreClick(cardsList[0])}
          onImageClick={onImageClick(cardsList[0].image)}
          onStatusClick={onStatusClick(cardsList[0])}
          onSaveClick={onSaveClick(cardsList[0])}
        />
        <div className={styles.mediumContainer}>
          {cardsList.map((el, idx) => {
            if (idx >= 1 && idx <= 4) {
              return (
                <Posts
                  key={el.id}
                  type={CardTypes.Medium}
                  {...el}
                  onMoreClick={onMoreClick(el)}
                  onImageClick={onImageClick(el.image)}
                  onStatusClick={onStatusClick(el)}
                  onSaveClick={onSaveClick(el)}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles.smallContainer}>
        {cardsList.map((el, idx) => {
          if (idx >= 5 && idx <= 10) {
            return (
              <Posts
                key={el.id}
                type={CardTypes.Small}
                {...el}
                onMoreClick={onMoreClick(el)}
                onImageClick={onImageClick(el.image)}
                onStatusClick={onStatusClick(el)}
                onSaveClick={onSaveClick(el)}
              />
            );
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardsList;
