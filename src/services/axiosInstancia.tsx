import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
