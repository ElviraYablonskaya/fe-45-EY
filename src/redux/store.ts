import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeSlice";
import postReducer from "./reducers/postSlice";
import imageReducer from "./reducers/imageSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import authReducer from "./reducers/authSlice"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    themeReducer,
    postReducer,
    imageReducer,
    authReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
