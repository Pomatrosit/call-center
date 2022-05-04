import axios from "axios";
import { FC, useState } from "react";
import Switcher from "../Switcher/Switcher";
import classes from "./Status.module.scss";

const Status: FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const toggle = async () => {
    let request = "pause";
    if (!status) {
      request = "unpause";
    }
    try {
      const response = await axios.post(`/calls/status/${request}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
