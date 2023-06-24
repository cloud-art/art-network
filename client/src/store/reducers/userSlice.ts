import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/types/IUser";

const initialState = {
  isAuth: false,
  user: {
    id: "",
    username: "",
    name: "",
    surname: "",
    avatar: "",
    password: "",
    posts: [""],
    contacts: [""],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newUser: IUser = {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        surname: action.payload.surname,
        password: action.payload.password,
        avatar: action.payload.avatar,
        posts: action.payload.posts,
        contacts: action.payload.contacts,
      };
      return {
        ...state,
        user: { ...newUser },
      };
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setAuth } = userSlice.actions;

export const userReducer = userSlice.reducer;
