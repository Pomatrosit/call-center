import axios from "axios";
import { API_URL } from "../constants/common";

export const useAxios = () => {
  return async <T>(type: "get" | "post", path: string, paramsOrData = {}) => {
    if (type === "get") {
      return await axios.get<T>(`${API_URL}/${path}`, {
        params: paramsOrData,
        headers: {
          authorization: String(localStorage.getItem("token")),
        },
      });
    } else {
      return await axios.post<T>(`${API_URL}/${path}`, paramsOrData, {
        headers: {
          authorization: String(localStorage.getItem("token")),
        },
      });
    }
  };
};
