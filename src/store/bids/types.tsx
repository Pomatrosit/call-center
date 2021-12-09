export enum types {
  SET_BIDS = "SET_BIDS",
}

interface setBidsAction {
  type: types.SET_BIDS;
  payload: any;
}

export type AuthActions = setBidsAction;
