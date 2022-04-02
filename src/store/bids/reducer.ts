import { types, BidsActions } from "./types";
import { IBid } from "../../common-types/bid";

interface IBidsState {
  bids: IBid[];
  page: number;
  pageCount: number;
  loading: boolean;
  error: string;
}

const initialState: IBidsState = {
  bids: [],
  page: 1,
  pageCount: 1,
  loading: false,
  error: "",
};

const reducer = (
  state: IBidsState = initialState,
  action: BidsActions
): IBidsState => {
  switch (action.type) {
    case types.SET_BIDS_FETCHING: {
      return {
        ...state,
        loading: true,
        error: "",
        bids: [],
      };
    }

    case types.SET_BIDS_FETCHING_SUCCESS: {
      return {
        ...state,
        loading: false,
        bids: action.payload.bids,
        pageCount: action.payload.pageCount,
      };
    }

    case types.SET_BIDS_FETCHING_ERROR: {
      return {
        ...state,
        loading: false,
        error: "Ошибка загрузки",
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
