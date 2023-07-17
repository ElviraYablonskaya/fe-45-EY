import { create } from "apisauce";
import {
  ActivateUserData,
  SignInData,
  SignUpUserData,
} from "../../redux/@types";
import { PER_PAGE } from "../constants";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = (offset: number, search?: string, ordering?:string) => {
  return API.get("/blog/posts", { limit: PER_PAGE, offset, search, ordering });
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const createToken = (data: SignInData) => {
  return API.post("/auth/jwt/create/", data);
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify", { token });
};

const getMyPosts = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  createToken,
  getUserInfo,
  refreshToken,
  verifyToken,
  getMyPosts,
};
