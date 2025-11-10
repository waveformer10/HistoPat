import axios from "axios";

export const apiHistopat = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HISTOPAT_API_BASE_URL_LOCAL,
});

// apiHistopat.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (
//       error.response &&
//       error.response.status === 400 &&
//       error.response.data.title === "One or more validation errors occurred."
//     ) {
//       console.log("ENTROU NO IF");
//       return Promise.resolve(error.response.data.errors);
//     }

//     return Promise.reject(error);
//   },
// );
