import { Button } from "react-bootstrap";
import { FC } from "react";
import classes from "./CallSection.module.scss";
import { useDispatch } from "react-redux";
import { setMinifiedWebPhone } from "../../store/webphone/actions";

const CallSection: FC = () => {
  const dispatch = useDispatch();

  const onWebPhoneClick = () => {
    dispatch(setMinifiedWebPhone(false));
  };

  return (
    <div className={classes.callSection}>
      <Button onClick={onWebPhoneClick} variant="success">
        Телефон
      </Button>
      <div className={classes.callInfo}>
        <p className={classes.callInfo__status}>Ожидание вызова</p>
        {/* <p className={classes.callInfo__time}>
          Время в разговоре за сегодня: <span> 1 час 25 минут</span>
        </p> */}
      </div>
    </div>
  );
};

export default CallSection;
