import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  studentFormDetails: null,
  error: null,
  allStudent: null
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    /* ==========================
       FETCH STUDENT PROFILE
    ========================== */
    .addCase("FETCH_STUDENT_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("STUDENT_FETCH_SUCCESS", (state, action) => {
      state.studentFormDetails = action.payload;
      state.loading = false;
    })

    /* ==========================
       UPDATE STUDENT PROFILE
    ========================== */
    .addCase("STUDENT_UPDATE_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("STUDENT_DETAILS_UPDATE_SUCCESS", (state, action) => {
      state.studentFormDetails = action.payload;
      state.loading = false;
    })

    /* ==========================
       FAIL CASE FOR BOTH
    ========================== */
    .addCase("STUDENT_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("ADMIN_STUDENTS_SUCCESS", (state, action) => {
      state.loading = false;
      state.allStudent = action.payload;
    })
    .addCase("RESET_DETAILS_SUCCESS", (state, action) => {
      state.loading = false,
        state.studentFormDetails = null,
        state.error = null,
        state.allStudent = null
    });
});
