import { Dispatch } from "redux";
import { types, BidsActions } from "./types";
import axios from "axios";

export const getBids = (page: number) => {
  return async (dispatch: Dispatch<BidsActions>) => {
    dispatch({
      type: types.SET_BIDS_FETCHING,
    });
    try {
      const { data } = await axios.get(`/bids/list?page=${page}`);
      dispatch({
        type: types.SET_BIDS_FETCHING_SUCCESS,
        payload: {
          bids: data.bids,
          pageCount: data.pageCount,
        },
      });
    } catch (e) {
      dispatch({
        type: types.SET_BIDS_FETCHING_ERROR,
      });
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
