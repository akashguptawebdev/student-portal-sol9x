import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder

    /* ================= LOGIN ================= */
    .addCase("LOGIN_USER_DISPATCH", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("USER_LOGIN_SUCCESS", (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase("USER_LOGIN_FAILED", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= SIGNUP ================= */
    .addCase("REGISTER_USER_DISPATCH", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("USER_REGISTER_SUCCESS", (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase("USER_REGISTER_FAILED", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("USER_LOGOUT", (state, action) => {
     localStorage.removeItem("userAuth");
      return { user: null, token: null };
    })
});
