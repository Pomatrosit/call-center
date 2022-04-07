import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./PhoneIcons.module.scss";
import { addNotification } from "../../store/notifications/actions";

const PhoneIcons = () => {
  const dispatch = useDispatch();
  const [isOnCall, setOnCall] = useState<boolean>(false);

  const phoneClickHandler = () => {
    if (isOnCall)
      dispatch(
        addNotification({
          id: Date.now(),
          variant: "success",
          text: "Звонок завершен! Проставьте результат звонка!",
          autoHideDuration: 4000,
        })
      );
    else
      dispatch(
        addNotification({
          id: Date.now(),
          variant: "success",
          text: "Вы начинаете звонок!",
          autoHideDuration: 4000,
        })
      );
    setOnCall((prev) => !prev);
  };

  return (
    <div className={classes.phoneIcons}>
      {!isOnCall ? (
        <div
          className={classes.phoneIcon + ` ${!isOnCall ? classes.onCall : ""}`}
          onClick={phoneClickHandler}
        >
          <img src="/icons/greenPhone.svg" alt="success" />
        </div>
      ) : (
        <div className={classes.phoneIcon} onClick={phoneClickHandler}>
          <img src="/icons/redPhone.svg" alt="danger" />
        </div>
      )}
    </div>
  );
};

export default PhoneIcons;
