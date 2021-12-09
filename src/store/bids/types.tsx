import { IBid } from "../../common-types/bid";

export enum types {
  SET_BIDS = "SET_BIDS",
  SET_PAGE = "SET_PAGE",
}

interface setBidsAction {
  type: types.SET_BIDS;
  payload: {
    bids: IBid[];
    pageCount: number;
  };
}

interface setPageAction {
  type: types.SET_PAGE;
  payload: number;
}

export type BidsActions = setBidsAction | setPageAction;
