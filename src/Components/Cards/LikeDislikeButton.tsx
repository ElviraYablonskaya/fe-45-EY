import { useState } from "react";

type ButtonLogicProps = {
  initialLikeCount: number;
  initialDislikeCount: number;
};

const LikeDislikeButton = ({
  initialLikeCount,
  initialDislikeCount,
}: ButtonLogicProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislikeClick = () => {
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);

      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };

  return {
    likeCount,
    dislikeCount,
    handleLikeClick,
    handleDislikeClick,
  };
};

export default LikeDislikeButton;
