import { Alert } from "react-bootstrap";
import { FC, useEffect } from "react";
import { INotification } from "../../common-types/notification";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/notifications/actions";

interface INotificationItemProps {
  notification: INotification;
}

const NotificationItem: FC<INotificationItemProps> = ({ notification }) => {
  const { id, autoHideDuration, text, variant } = notification;

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(removeNotification(id));
  };

  const autoClose = () => {
    if (autoHideDuration) {
      setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }
  };

  useEffect(() => {
    autoClose();
    //eslint-disable-next-line
  }, []);

  return (
    <Alert onClose={onClose} variant={variant} dismissible>
      {text}
    </Alert>
  );
};

export default NotificationItem;
