import { store } from "../store/store";
import { useDispatch } from "react-redux";
import { Dispatch, Store } from "redux";

export type Actions = AppDispatch extends (action: infer Action) => void
  ? Action
  : never;

type D = () => (action: Actions | ((dispatch: AppDispatch) => void)) => void;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: D = () => useDispatch<AppDispatch>() as any;
