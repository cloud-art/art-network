import {
  ListenerMiddleware,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { artNetworkApi } from "@/services/artNetworkService";
import { signOut } from "../actions";

export const setTokenMiddleware = createListenerMiddleware();
export const removeTokenMiddleware = createListenerMiddleware();
export const addTokenMiddleware = createListenerMiddleware();

setTokenMiddleware.startListening({
  matcher: isAnyOf(
    artNetworkApi.endpoints.updateToken.matchFulfilled,
    artNetworkApi.endpoints.login.matchFulfilled,
    artNetworkApi.endpoints.register.matchFulfilled
  ),
  effect: (action, listenerApi) => {
    try {
      localStorage.setItem("token", action.payload.token);
    } catch (e) {
      console.log(e);
    }
  },
});

removeTokenMiddleware.startListening({
  matcher: isAnyOf(signOut),
  effect: (action, listenerApi) => {
    try {
      localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  },
});
