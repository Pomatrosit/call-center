import { Bid, NewBidActions, types } from "./types";

const initialState = new Bid();

const reducer = (state = initialState, action: NewBidActions): Bid => {
  switch (action.type) {
    case types.NEW_BID_PARAMETERS_SET: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
