import axios from "axios";
import { setAuth } from "../store/auth/actions";
import { store } from "../store/store";
import { D } from "../hooks/useAppDispatch";

export const useAxios = () => {
  const dispatch = store.dispatch as ReturnType<D>;

  return async (
    url: any,
    method: any,
    data: any = null
  ): Promise<ReturnType<typeof axios> | null> => {
    try {
      const response = await axios({
        url,
        method,
        data,
        headers: {
          authorization: String(localStorage.getItem("token")),
        },
      });

      if (response.data.status === 401) {
        dispatch(setAuth(false));
        return null;
      }

      return response;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
};
