import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { appReducer } from "./reducer/appReducer";

let persistedUser = null;

try {
  const userFromStorage = localStorage.getItem("user");

  if (userFromStorage && userFromStorage !== "undefined") {
    persistedUser = JSON.parse(userFromStorage);
  }
} catch (error) {
  console.error("Invalid user data in localStorage", error);
  localStorage.removeItem("user");
}

const store = configureStore({
  reducer: {
    userAuth: userReducer,
    appData: appReducer,
  },
  preloadedState: {
    userAuth: {
      user: persistedUser,
      loading: false,
      error: null,
    },
  },
});

export default store;
