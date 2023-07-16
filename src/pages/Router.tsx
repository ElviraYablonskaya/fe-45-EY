import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./Home";
import SignUp from "../pages/SignUp";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Header from "../components/Header";
import SignIn from "../pages/SignIn";
import SelectedPost from "./SelectedPost";
import Success from "./Success";
import { AuthSelectors, getUserData } from "../redux/reducers/authSlice";
import { useEffect } from "react";
import Search from "../pages/Search";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  RegistrationConfirmation = "/activate/:uid/:token",
  SelectedPost = "/post/:id",
  Success = "/success",
  Search = "/posts/:search",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<Header />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route
            path={RoutesList.SignUp}
            element={
              !isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.Home} />
            }
          />
          <Route
            path={RoutesList.SignIn}
            element={
              !isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home} />
            }
          />
          <Route
            path={RoutesList.RegistrationConfirmation}
            element={
              !isLoggedIn ? (
                <RegistrationConfirmation />
              ) : (
                <Navigate to={RoutesList.Home} />
              )
            }
          />
          <Route
            path={RoutesList.Default}
            element={<Navigate to={RoutesList.Home} />}
          />
          <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
          <Route
            path={RoutesList.Success}
            element={
              !isLoggedIn ? <Success /> : <Navigate to={RoutesList.Home} />
            }
          />
          <Route path={RoutesList.Search} element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
