import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/types/IUser";
import { artNetworkApi } from "@/services/artNetworkService";
import jwtDecode from "jwt-decode";
import IPost from "@/types/IPost";

export interface userState {
  isAuth: boolean;
  user: IUser | null;
  contacts: Array<IUser>;
  searchUsers: Array<IUser>;
  selectedUser: IUser | null;
  posts: Array<IPost>;
}

const initialState: userState = {
  isAuth: true,
  user: {
    _id: "64945a4319a1aa5cabc7b80e",
    username: "imageUser",
    name: "imageName",
    surname: "imageSurname",
    avatar: "image/cf80dac8-0fd9-4fb1-81f0-daa33fcea74d.jpg",
    posts: [],
    contacts: ["6494700cdc812aab0ccc54b2", "64947016dc812aab0ccc54b6"],
  },
  contacts: [],
  searchUsers: [],
  selectedUser: null,
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state, { payload }) => {
      state.isAuth = false;
      state.user = null;
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = { ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      artNetworkApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        state.user = jwtDecode(payload.token);
        state.selectedUser = jwtDecode(payload.token);
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
    builder.addMatcher(
      artNetworkApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        state.contacts = [...payload];
      }
    );
    builder.addMatcher(
      artNetworkApi.endpoints.searchUsers.matchFulfilled,
      (state, { payload }) => {
        state.searchUsers = [...payload];
      }
    );
  },
});

export const { signOut, setSelectedUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
