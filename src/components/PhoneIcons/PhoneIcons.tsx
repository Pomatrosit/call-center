import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./PhoneIcons.module.scss";
import { addNotification } from "../../store/notifications/actions";
import ReactTooltip from "react-tooltip";
import { Button } from "react-bootstrap";

const PhoneIcons = () => {
  const dispatch = useDispatch();
  const [isOnCall, setOnCall] = useState<boolean>(false);
  const [isMicrophone, setMicrophone] = useState<boolean>(true);

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
      <div
        data-tip={!isOnCall ? "Начать звонок" : "Завершить звонок"}
        className={classes.phoneIcon + ` ${!isOnCall ? classes.onCall : ""}`}
        onClick={phoneClickHandler}
      >
        <img
          src={!isOnCall ? "/icons/greenPhone.svg" : "/icons/redPhone.svg"}
          alt="phone"
        />
      </div>
      <Button variant="success">
        <img
          src={!isOnCall ? "/icons/greenPhone.svg" : "/icons/redPhone.svg"}
          alt="phone"
        />
      </Button>
      <ReactTooltip delayShow={500} globalEventOff={"click"} />
    </div>
  );
};

export default PhoneIcons;
