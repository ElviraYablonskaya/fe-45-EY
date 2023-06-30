import { PostsList } from  "../../src/@types";

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

export type SignUpUserPayload = {
  data: SignUpUserData;
  callback: () => void;
};

export type PostsData = {
  count: number;
  next: string;
  previous: null;
  results: PostsList;
};
