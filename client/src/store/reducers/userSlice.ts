import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/types/IUser";
import { artNetworkApi } from "@/services/artNetworkService";
import jwtDecode from "jwt-decode";

export interface AuthState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state, action) => {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      artNetworkApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        state.user = jwtDecode(payload.token);
      }
    );
    builder.addMatcher(
      artNetworkApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        state.user = jwtDecode(payload.token);
      }
    );
    builder.addMatcher(
      artNetworkApi.endpoints.updateToken.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        state.user = jwtDecode(payload.token);
      }
    );
  },
});

export const { signOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
