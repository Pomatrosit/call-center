import { Dispatch } from "redux";
import { types, NotificationActions } from "./types";
import { INotification } from "../../common-types/notification";

export const addNotification = (payload: INotification) => {
  return (dispatch: Dispatch<NotificationActions>) => {
    dispatch({
      type: types.ADD_NOTIFICATION,
      payload,
    });
  };
};

export const removeNotification = (id: number) => {
  return (dispatch: Dispatch<NotificationActions>) => {
    dispatch({
      type: types.REMOVE_NOTIFICATION,
      payload: id,
    });
  };
};
