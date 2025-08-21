import { createSlice } from "@reduxjs/toolkit";
import { setUserProfile } from "./userSlice";  // 👈 import user action

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
  // if the backend response was sent directly (with .user inside)
  state.user = action.payload.user || action.payload; 
  state.token = action.payload.token || null;
  state.isAuthenticated = true;
},

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;

// 👇 custom login action (dispatches both auth + user updates)
export const loginUser = (userData) => (dispatch) => {
  // save auth
  dispatch(loginSuccess({ user: userData, token: userData.token }));

  // save profile separately
  dispatch(setUserProfile({
    name: userData.name,
    bio: userData.bio || "",
    location: userData.location || "",
    rating: userData.rating || 0,
    reviewsCount: userData.reviewsCount || 0,
    teachingSessions: userData.teachingSessions || 0,
    learningSessions: userData.learningSessions || 0,
    avatarUrl: userData.avatarUrl || "",
  }));
};

export default authSlice.reducer;
