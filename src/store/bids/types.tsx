import { IBid } from "../../common-types/bid";

export enum types {
  SET_BIDS = "SET_BIDS",
  SET_PAGE = "SET_PAGE",
  SET_BIDS_FETCHING = "SET_BIDS_FETCHING",
  SET_BIDS_FETCHING_ERROR = "SET_BIDS_FETCHING_ERROR",
  SET_BIDS_FETCHING_SUCCESS = "SET_BIDS_FETCHING_SUCCESS",
}

// interface setBidsAction {
//   type: types.SET_BIDS;
//   payload: {
//     bids: IBid[];
//     pageCount: number;
//   };
// }

interface setBidsFetchingSuccess {
  type: types.SET_BIDS_FETCHING_SUCCESS;
  payload: {
    bids: IBid[];
    pageCount: number;
  };
}

interface setBidsFetching {
  type: types.SET_BIDS_FETCHING;
}

interface setBidsFetchingError {
  type: types.SET_BIDS_FETCHING_ERROR;
}

interface setBidsFetchingSuccess {
  type: types.SET_BIDS_FETCHING_SUCCESS;
}

interface setPageAction {
  type: types.SET_PAGE;
  payload: number;
}

export type BidsActions =
  | setPageAction
  | setBidsFetching
  | setBidsFetchingError
  | setBidsFetchingSuccess;
