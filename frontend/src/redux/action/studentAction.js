import axios from "axios";
import { getProfileDetailsUrl, profileUpdateUrl } from "../apis/globalApi";
import {  getAuthToken } from "../../utils";
import { adminGetAllStudents } from "./adminAction";

/* ==========================
   GET MY STUDENT PROFILE
========================== */
export const getMyStudentProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_STUDENT_REQUEST" });

    const token = getAuthToken();
    const { data } = await axios.get(getProfileDetailsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch({
        type: "STUDENT_FETCH_SUCCESS",
        payload: data.student || data,
      });
    } else {
      dispatch({
        type: "STUDENT_FAIL",
        payload: data.message || "Failed to fetch student profile",
      });
    }
  } catch (error) {
    dispatch({
      type: "STUDENT_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ==========================
   UPDATE STUDENT PROFILE
========================== */
export const updateStudentProfile = (updatedData) => async (dispatch) => {
  const token = getAuthToken(); // just the token string
  try {
    dispatch({ type: "STUDENT_UPDATE_REQUEST" });

    // Proper Axios config with headers
    const { data } = await axios.put(profileUpdateUrl, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    // Dispatch success only if backend responds with success: true
    if (data.success) {
      dispatch({
        type: "STUDENT_DETAILS_UPDATE_SUCCESS",
        payload: data.student
      });

      // Refresh student profile
      dispatch(getMyStudentProfile());
      dispatch(adminGetAllStudents());
    } else {
      dispatch({
        type: "STUDENT_FAIL",
        payload: data.message || "Failed to update student profile",
      });
    }
  } catch (error) {
    dispatch({
      type: "STUDENT_FAIL",
      payload: error.response?.data?.message || error.message,
    });
    console.log(error?.message);
  }
};



