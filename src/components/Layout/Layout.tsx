import { FC } from "react";
import classes from "./Layout.module.scss";
import Header from "../Header/Header";
import MainNavigation from "../MainNavigation/MainNavigation";
import ModalWindow from "../ModalWindow/ModalWindow";
import NotificationList from "../NotificationList/NotificationList";

const Layout: FC = ({ children }) => {
  return (
    <div className={classes.layout}>
      <nav className={classes.nav}>
        <MainNavigation />
      </nav>
      <div className={classes.appWrapper}>
        <Header />
        <ModalWindow />
        <NotificationList />
        <div className={classes.page}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
