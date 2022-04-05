import { FC } from "react";
import classes from "./Header.module.scss";
import Status from "../Status/Status";
import UserSettings from "../UserSettings/UserSettings";
import CallSection from "../CallSection/CallSection";

const Header: FC = () => {
  return (
    <section className={classes.header}>
      <div className={classes.headerFirst}>
        <CallSection />
        <Status />
      </div>
      <div className={classes.headerSecond}>
        <div className={classes.pinCode}>Пин-код: 1234</div>
        <UserSettings />
      </div>
    </section>
  );
};

export default Header;
