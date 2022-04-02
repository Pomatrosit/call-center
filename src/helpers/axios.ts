import axios, { AxiosResponse } from "axios";
import { API_URL, TOKENS } from "../constants/common";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";

export const axiosConfig = () => {
  axios.defaults.baseURL = API_URL;
  const accessToken = sessionStorage.getItem(TOKENS.accessToken);
  if (accessToken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

let axiosUrl;
let axiosMethod;
let axiosData;

export const axiosInterceptor = (
  login: () => void,
  logout: () => void
): void => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        if (error.response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
          console.log("ACCESS IS INVALID. GOING TO REFRESH");
          axiosUrl = error.response.config.url;
          axiosMethod = error.response.config.method;
          axiosData = error.response.config.data;
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionStorage.getItem(TOKENS.refreshToken)}`;
          try {
            const response: AxiosResponse = await axios.get(
              "/auth/refresh_token"
            );
            const { accessToken, refreshToken } = response.data;
            sessionStorage.setItem(TOKENS.accessToken, accessToken);
            sessionStorage.setItem(TOKENS.refreshToken, refreshToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            login();
            console.log("SUCCESS REFRESH");

            console.log("axiosMethod", axiosMethod);
            console.log("axiosUrl", axiosUrl);
            console.log("axiosData", axiosData);

            return axios({
              method: axiosMethod,
              url: axiosUrl,
              data: axiosData,
            });
          } catch (error) {
            console.log("REFRESH IS INVALID");
            logout();
          }
        } else return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  );
};
