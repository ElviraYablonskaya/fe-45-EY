import { PostsList } from "../../src/@types";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type SignUpUserData = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponseData = {
  username: string;
  email: string;
  id: number;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>;

export type ActivateUserPayload = PayloadWithDataAndCallback<ActivateUserData>;

export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>;

export type PostsData = {
  count: number;
  next: string;
  previous: string;
  results: PostsList;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignInResponseData = {
  access: string;
  refresh: string;
};

export type UserInfoResponse = {
  username: string;
  id: number;
  email: string;
};

export type RefreshTokenPayload = {
  access: string;
};

export type GetPostsPayload = {
  offset: number;
  isOverwrite: boolean;
};

export type SetPostsListPayload = {
  total: number;
  postsList: PostsList;
  isOverwrite: boolean;
};

export type SetSearchedPostsPayload = Omit<SetPostsListPayload, "isOverwrite">

export type GetSearchedPostsPayload = {
  offset: number,
  search: string
}