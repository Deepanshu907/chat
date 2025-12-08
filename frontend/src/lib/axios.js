// import axios from "axios";

//const BASE_URL ="https://chatsphere-s6h3.onrender.com/api";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // send cookies with the request
// });



import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://chat-backend-h4jy.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

