import { FC } from "react";
import classes from "./Layout.module.scss";
import Header from "../Header/Header";
import MainNavigation from "../MainNavigation/MainNavigation";
import NotificationList from "../NotificationList/NotificationList";
import MinifiedWebPhone from "../MinifiedWebPhone/MinifiedWebPhone";
import WebPhone from "../WebPhone/WebPhone";

const Layout: FC = ({ children }) => {
  return (
    <div className={classes.layout}>
      <nav className={classes.nav}>
        <MainNavigation />
      </nav>
      <div className={classes.appWrapper}>
        <Header />
        <NotificationList />
        <WebPhone />
        <MinifiedWebPhone />
        <div className={classes.page}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
