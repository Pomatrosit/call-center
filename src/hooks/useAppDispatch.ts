import { store } from "../store/store";
import { useDispatch } from "react-redux";

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
