import { AppDispatch } from "../../hooks/useAppDispatch";
import { Bid, types } from "./types";

export const setNewBidParams = (bid: Partial<Bid>) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: types.NEW_BID_PARAMETERS_SET,
      payload: bid,
    });
  };
};
