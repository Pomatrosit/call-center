import { FC } from "react";
import classes from "./Switcher.module.scss";

interface IPorps {
  value: boolean;
  onToggle: () => void;
}

const Switcher: FC<IPorps> = ({ value, onToggle }) => {
  const ballClasses = [classes.ball];

  if (!value) ballClasses.push(classes.unactive);
  return (
    <div className={classes.switcher} onClick={onToggle}>
      <div className={ballClasses.join(" ")}></div>
    </div>
  );
};

export default Switcher;
