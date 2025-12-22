import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { appReducer } from "./reducer/appReducer";

// Load persisted user from localStorage
const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const store = configureStore({
  reducer: {
    userAuth: userReducer,
    appData: appReducer,
  },
  preloadedState: {
    userAuth: { user: persistedUser, loading: false, error: null },
  },
});

export default store;
