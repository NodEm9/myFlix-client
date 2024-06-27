import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    deleteUser: null,
    loggedIn: Boolean(localStorage.getItem("token")),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setDeleteUser: (state, action) => {
      state.deleteUser = action.payload;
    },

    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setDeleteUser,
  setLoggedIn,
} = userSlice.actions;

export default userSlice.reducer;