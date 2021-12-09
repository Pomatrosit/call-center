import { types, BidsActions } from "./types";
import { IBid } from "../../common-types/bid";

interface IBidsState {
  bids: IBid[];
  page: number;
  pageCount: number;
  loading: boolean;
  error: boolean;
}

const initialState: IBidsState = {
  bids: [],
  page: 1,
  pageCount: 1,
  loading: false,
  error: false,
};

const reducer = (
  state: IBidsState = initialState,
  action: BidsActions
): IBidsState => {
  switch (action.type) {
    case types.SET_BIDS: {
      return {
        ...state,
        bids: action.payload.bids,
        pageCount: action.payload.pageCount,
      };
    }

    case types.SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
