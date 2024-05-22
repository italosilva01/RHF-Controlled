import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
  headers: {
    "Content-Type": "application/json",
    // "X-Subscription-Token":
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmQzOTI1Ny00NThjLTQzOGEtODQ2MC01YmIzM2E5MGU5MzciLCJlbWFpbCI6Iml0YWxvLnNpbHZhbjg3QGdtYWlsLmNvbSIsImlhdCI6MTcxNjM4NDcyNX0.VRuybtytZ4bXEGPnbg8mVH3uHgDv2-zw7GJ8O1iRN28",
  },
});

export default AxiosInstance;
