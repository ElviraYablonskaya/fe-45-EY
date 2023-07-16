import { FC } from "react";

import { PostsList } from "../../@types";

import Posts from "../Card";
import styles from "./CardsList.module.scss";
import { CardTypes } from "../Card/Card";
import { useCardActions } from "../../hooks";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  const { onMoreClick, onImageClick, onStatusClick, onSaveClick } =
    useCardActions();

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
