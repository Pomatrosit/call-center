import { Dispatch } from "redux";
import { Bid, types, NewBidActions } from "./types";

export const setNewBidParams = (bid: Partial<Bid>) => {
  return (dispatch: Dispatch<NewBidActions>) => {
    dispatch({
      type: types.NEW_BID_PARAMETERS_SET,
      payload: bid,
    });
  };
};
