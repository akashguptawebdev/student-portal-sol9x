import axios from "axios";
import { getAllStudentDetailsUrl } from "../apis/globalApi";
import { getAuthToken } from "../../utils";

const BASE_URL = "http://localhost:5000/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ==========================
   ADMIN: GET ALL STUDENTS
========================== */

export const adminGetAllStudents = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_STUDENTS_REQUEST" });

    const token = getAuthToken();
    console.log("toeknr", token)
    const { data } = await axios.get(getAllStudentDetailsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "ADMIN_STUDENTS_SUCCESS",
      payload: data?.data || data,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_STUDENTS_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

