import { ApiResponse } from "apisauce";
import { call, put } from "redux-saga/effects";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../../utils/constants";
import API from "../../../utils/api/index";
import { RefreshTokenPayload } from "../../../redux/@types";
import { logoutUser, setAccessToken } from "../../reducers/authSlice";

export default function* callCheckingAuth(apiCall: any, ...params: any) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (accessToken && refreshToken) {
    const response: ApiResponse<any> = yield call(
      apiCall,
      accessToken,
      ...params
    ); // тот запрос, который мы хотим выполнить из приложения
    const { status: accessStatus } = yield call(API.verifyToken, accessToken); //проверка не помер ли аксес

    if (response.status === 401 && accessStatus === 401) {
      //случай когда аксес умер
      // случай когда access помер

      const { status: refreshStatus } = yield call(
        API.verifyToken,
        refreshToken
      ); // проверка не помер ли refresh
      if (refreshStatus === 401) {
        // если рефреш помер - логаут
        //log out
        yield put(logoutUser());
      } else {
        // если refresh живой
        const newAccessResponse: ApiResponse<RefreshTokenPayload> = yield call(
          API.refreshToken,
          refreshToken
        );
        if (newAccessResponse.ok && newAccessResponse.data) {
          //проверяем все ли хорошо с новым запросом
          const { access } = newAccessResponse.data;
          localStorage.setItem(ACCESS_TOKEN_KEY, access);
          const newResponse: ApiResponse<any> = yield call(
            apiCall,
            access,
            ...params
          ); //новый запрос с новым токеном
          yield put(setAccessToken(access));
          return newResponse; //отдаем юзеру данные с валидным токеном
        } else {
          yield put(logoutUser());
        }
      }
    } else {
      return response;
    }
  } else {
    //если нет токенов - log out
    yield put(logoutUser());
  }
}
