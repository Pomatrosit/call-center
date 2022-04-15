import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import authReducer from "./auth/reducer";
import newBidReducer from "./newBid/reducer";
import modalReducer from "./modal/reducer";
import notificationReducer from "./notifications/reducer";
import bidsReducer from "./bids/reducer";
import socketReducer from "./socket/reducer";
import webPhoneReducer from "./webphone/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  newBid: newBidReducer,
  modal: modalReducer,
  notifications: notificationReducer,
  bids: bidsReducer,
  socket: socketReducer,
  webPhone: webPhoneReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
