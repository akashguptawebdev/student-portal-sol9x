import { BASE_URL } from "../../utils";

export const loginAPI = `${BASE_URL}/api/auth/login`
export const signupAPI = `${BASE_URL}/api/auth/signup`
export const getUserAPI = `${BASE_URL}/api/auth/getUser`

// STUDENT APIS
// export const profileCreateUrl = `${BASE_URL}/api/student/update`
export const profileUpdateUrl = `${BASE_URL}/api/student/update`
export const getProfileDetailsUrl = `${BASE_URL}/api/student/details`

export const getAllStudentDetailsUrl = `${BASE_URL}/api/admin/getAll`