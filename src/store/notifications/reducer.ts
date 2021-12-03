import { types, NotificationActions } from "./types";
import { INotification } from "../../common-types/notification";

interface INotificationState {
  notifications: INotification[];
}

const initialState: INotificationState = {
  notifications: [],
};

const reducer = (
  state: INotificationState = initialState,
  action: NotificationActions
): INotificationState => {
  switch (action.type) {
    case types.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    }

    case types.REMOVE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item.id !== action.payload
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
