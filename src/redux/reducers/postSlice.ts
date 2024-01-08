import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LikeStatus, Post, PostsList } from "../../@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
  savedPosts: PostsList;
  postList: PostsList;
  singlePost: Post | null;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postList: [],
  singlePost: null,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedPostModalOpened = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload
    },

    getPostList: (_, __: PayloadAction<undefined>) => {},
    setPostList: (state, action: PayloadAction<PostsList>) => {
      state.postList = action.payload;
    },

    setLikeStatus: (
      state,
      action: PayloadAction<{ card: Post; status: LikeStatus }>
    ) => {
      const { card, status } = action.payload;
      const likedIndex = state.likedPosts.findIndex(
        (item) => item.id === card.id
      );
      const dislikedIndex = state.dislikedPosts.findIndex(
        (item) => item.id === card.id
      );
      const isLike = status === LikeStatus.Like;
      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : dislikedIndex;
      const secondaryIndex = isLike ? dislikedIndex : likedIndex;
      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    setSaveStatus: (state, action: PayloadAction<{ card: Post }>) => {
      const { card } = action.payload;
      const savedIndex = state.savedPosts.findIndex(
        (item) => item.id === card.id
      );
      if (savedIndex === -1) {
        state.savedPosts.push(card);
      } else {
        state.savedPosts.splice(savedIndex, 1);
      }
    },
  },
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,   
  setLikeStatus,
  setSaveStatus,
  getPostList,
  setPostList,
  setSinglePost,
  getSinglePost,
} = postSlice.actions;

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts,
  getSavePosts: (state: RootState) => state.postReducer.savedPosts,
  getPostList: (state: RootState) => state.postReducer.postList,
  getSinglePost: (state: RootState) => state.postReducer.singlePost
};

export default postSlice.reducer;
