import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useMemo } from "react";
import { userReducer } from "./reducers/userSlice";
import { artNetworkApi } from "@/services/artNetworkService";
import {
  addTokenMiddleware,
  removeTokenMiddleware,
  setTokenMiddleware,
} from "./middlewares/localStorageMiddlewares";

let store: AppStore;

export const initStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      userReducer,
      [artNetworkApi.reducerPath]: artNetworkApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(artNetworkApi.middleware)
        .concat(setTokenMiddleware.middleware)
        .concat(removeTokenMiddleware.middleware)
        .concat(addTokenMiddleware.middleware),
  });
};

export const initializeStore = (preloadedState: PreloadedState<RootState>) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  store.subscribe(() => {});
  return store;
}

export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(initStore, { debug: false });
