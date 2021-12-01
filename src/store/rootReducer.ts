import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import authReducer from "./auth/reducer";
import newBidReducer from "./newBid/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  newBid: newBidReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
