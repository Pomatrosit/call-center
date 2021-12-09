import { Dispatch } from "redux";
import { types, BidsActions } from "./types";
import { IBid } from "../../common-types/bid";
import { useAxios } from "../../hooks/useAxios";
import { API_URL } from "../../constants/common";
import { addNotification } from "../notifications/actions";

export const getBids = (page: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const axiosWrapper = useAxios();
      const response = await axiosWrapper(`${API_URL}/getBids`, "POST", {
        page,
      });
      dispatch(setBids(response?.data.bids ?? [], response?.data.pageCount));
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
