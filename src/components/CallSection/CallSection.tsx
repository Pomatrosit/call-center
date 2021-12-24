import { Button } from "react-bootstrap";
import { FC } from "react";
import classes from "./CallSection.module.scss";
import { openModal } from "../../store/modal/actions";
import { useDispatch } from "react-redux";
import WebPhone from "../WebPhone/WebPhone";

const CallSection: FC = () => {
  const dispatch = useDispatch();

  const onWebPhoneClick = () => {
    dispatch(openModal("Веб-телефон", WebPhone));
  };

  return (
    <div className={classes.callSection}>
      <Button onClick={onWebPhoneClick} variant="success">
        Телефон
      </Button>
      <div className={classes.callInfo}>
        <p className={classes.callInfo__status}>Ожидание вызова</p>
        <p className={classes.callInfo__time}>
          Время в разговоре за сегодня: <span> 1 час 25 минут</span>
        </p>
      </div>
    </div>
  );
};

export default CallSection;
