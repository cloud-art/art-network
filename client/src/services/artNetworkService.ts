import { API_URL } from "@/constants/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const artNetworkApi = createApi({
  reducerPath: "artNetworkApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    fetchUserPosts: build.query({
      query: (id: string) => ({
        url: `/post/getUserPosts/${id}`,
      }),
    }),
    searchUsers: build.query({
      query: (username: string) => ({
        url: `/user/searchUser?search=${username}&count=10&offset=0`,
      }),
    }),
    getContacts: build.query({
      query: (id: string) => ({
        url: `/user/searchContact?id=${id}`,
      }),
    }),
    fetchUsers: build.query({
      query: () => ({
        url: `/user/getAllUsers`,
      }),
    }),
    fetchUser: build.query({
      query: (id: string) => ({
        url: `/user/getOne/${id}`,
      }),
    }),
    login: build.query({
      query: ({ username, password }) => ({
        url: `/user/login`,
        method: "POST",
        body: { username, password },
      }),
    }),
    register: build.query({
      query: () => ({
        url: `/user/register`,
        method: "POST",
      }),
    }),
    updateToken: build.query({
      query: () => ({
        url: `/user/updateToken`,
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
  }),
});

// export endpoints for use in SSR
export const { fetchUser } = artNetworkApi.endpoints;
