// export const BASE_URL = 'http://localhost:5001'
export const BASE_URL = 'https://student-portal-sol9x.onrender.com'


export const getAuthToken = () => {
  const stored = localStorage.getItem("token");
    console.log("stored", stored)
  if (!stored) return null;


  return stored || null;
};
