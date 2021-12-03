import { FC } from "react";
import classes from "./NotificationList.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import NotificationItem from "../NotificationItem/NotificationItem";

const NotificationList: FC = () => {
  const { notifications } = useAppSelector((state) => state.notifications);

  return (
    <div className={classes.list}>
      {notifications.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}
    </div>
  );
};

export default NotificationList;
