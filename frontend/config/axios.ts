import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const handleRes = (res: AxiosResponse) => res;
const handleErr = (err: AxiosError) => {
  return Promise.reject(err);
};

const api = axios.create({ withCredentials: true });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => handleErr(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => handleRes(response),
  (error: AxiosError) => handleErr(error)
);

export default api;
