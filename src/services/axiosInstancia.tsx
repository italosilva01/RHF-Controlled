import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
});

export default AxiosInstance;
