import axios from "axios";

export const apiHistopat = axios.create({
  baseURL: "http://localhost:5047"
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
