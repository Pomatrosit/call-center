import { FC, useState } from "react";
import Switcher from "../Switcher/Switcher";
import classes from "./Status.module.scss";

const Status: FC = () => {
  const [status, setStatus] = useState<boolean>(true);

  const toggle = () => {
    setStatus(!status);
  };

  return (
    <div className={classes.status}>
      <p className={classes.title}>
        {" "}
        {status ? <span>Работа</span> : <span>Пауза</span>}
      </p>
      <Switcher value={status} onToggle={toggle} />
    </div>
  );
};

export default Status;
