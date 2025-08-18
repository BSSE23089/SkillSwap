import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import skillReducer from "./skillSlice";
import sessionReducer from "./sessionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    skills: skillReducer,
    sessions: sessionReducer,
  },
});

export default store;
