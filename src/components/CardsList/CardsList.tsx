import  { FC } from "react";

import { PostsList } from "src/@types";

import Posts from "../Card";
import styles from "./CardsList.module.scss";
import { CardTypes } from "../Card/Card";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList.length ? (
    <div className={styles.cardListContainer}>
      <div className={styles.cardListWrap}>
        <Posts type={CardTypes.Large} {...cardsList[0]} />
        <div className={styles.mediumContainer}>
          {cardsList.map((el, idx) => {
            if (idx >= 1 && idx <= 4) {
              return <Posts key={el.id} type={CardTypes.Medium} {...el} />;
            }
          })}
        </div>
      </div>
      <div className={styles.smallContainer}>
        {cardsList.map((el, idx) => {
          if (idx >= 5 && idx <= 10) {
            return <Posts key={el.id} type={CardTypes.Small} {...el} />;
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardsList;