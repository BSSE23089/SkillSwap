// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import skillReducer from "./skillSlice";
import sessionReducer from "./sessionSlice";

// persist configs for each slice
const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

// wrap reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    skills: skillReducer,
    sessions: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

export const persistor = persistStore(store);
export default store;
