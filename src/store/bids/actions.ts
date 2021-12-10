import { Dispatch } from "redux";
import { types, BidsActions } from "./types";
import { IBid } from "../../common-types/bid";
import { API_URL } from "../../constants/common";
import { addNotification } from "../notifications/actions";
import axios from "axios";

export const getBids = (page: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/getBids`,
        {
          page,
        },
        {
          headers: {
            authorization: String(localStorage.getItem("token")),
          },
        }
      );
      dispatch(setBids(data.bids, data.pageCount));
    } catch (e) {
      dispatch(
        addNotification({
          id: Date.now(),
          variant: "danger",
          autoHideDuration: null,
          text: "Ошибка загрузки данных",
        })
      );
    }
  };
};

export const setPage = (page: number) => {
  return (dispatch: Dispatch<BidsActions>) => {
    dispatch({
      type: types.SET_PAGE,
      payload: page,
    });
  };
};

export const setBids = (bids: IBid[], pageCount: number) => {
  return (dispatch: Dispatch<BidsActions>) => {
    dispatch({
      type: types.SET_BIDS,
      payload: {
        bids,
        pageCount,
      },
    });
  };
};
