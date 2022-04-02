import axios, { AxiosResponse } from "axios";
import { TOKENS } from "../constants/common";

export const checkAuth = (login: () => void, logout: () => void) => {
  if (!sessionStorage.getItem(TOKENS.accessToken)) {
    logout();
  } else {
    axios.get("/auth/access_token").then((response: AxiosResponse) => {
      if (response.data === true) login();
      console.log("ACCESS IS VALID");
    });
  }
};
