import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import authReducer from "./auth/reducer";
import newBidReducer from "./newBid/reducer";
import modalReducer from "./modal/reducer";
import notificationReducer from "./notifications/reducer";
import bidsReducer from "./bids/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  newBid: newBidReducer,
  modal: modalReducer,
  notifications: notificationReducer,
  bids: bidsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
