import axios from "axios";
import { getUserAPI, loginAPI, signupAPI } from "../apis/globalApi";
import { getAuthToken } from "../../utils";


/* ==========================
   USER LOGIN
========================== */
export const userLogin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_DISPATCH" });

    const { data } = await axios.post(loginAPI, credentials);

    if (data.success) {
      // store user in Redux
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data.data, // only user
      });

      // store token separately
      localStorage.setItem("token", data.token);

      // persist user in localStorage for refresh
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_DISPATCH" });

    const token = getAuthToken(); // returns only the token
    if (!token) throw new Error("No token found");

    const { data } = await axios.get(getUserAPI, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      // store only user in Redux
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data.user, // backend returns { success:true, user: {...} }
      });
    }
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const userRegister = (credentials) => async (dispatch) =>{
  try{

     dispatch({ type: "REGISTER_USER_DISPATCH" });

    const {data} = await axios.post(signupAPI,
      credentials
    );
     if (data.success) {
      // store user in Redux
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data.data, // only user
      });

      // store token separately
      localStorage.setItem("token", data.token);

      // persist user in localStorage for refresh
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  }catch(error){
     dispatch({
      type: "USER_REGISTER_FAILED",
      payload: error.response && error.response.data.message,
    });
  }
}

/* ==========================
   USER LOGOUT
========================== */
export const userLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "RESET_DETAILS_SUCCESS" });
};
