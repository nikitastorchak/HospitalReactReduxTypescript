import axios from "axios";

export const API_URL = `http://localhost:8000`;

// const $api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });
//
// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem(
//     "accessToken"
//   )}`;
//   console.log("PODLUCHIL");
//   return config;
// });

// $api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !originalRequest._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get(`${API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("accessToken", response.data.accessToken);
//         return $api.request(originalRequest);
//       } catch (e) {
//         console.log(e, "Не авторизован!");
//       }
//     } else {
//       throw error;
//     }
//   }
// );

// export default $api;
