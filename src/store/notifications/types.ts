import { INotification } from "../../common-types/notification";

export enum types {
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
}

export interface addNotificationAction {
  type: types.ADD_NOTIFICATION;
  payload: INotification;
}

interface removeNotificationAction {
  type: types.REMOVE_NOTIFICATION;
  payload: number;
}

export type NotificationActions =
  | addNotificationAction
  | removeNotificationAction;
