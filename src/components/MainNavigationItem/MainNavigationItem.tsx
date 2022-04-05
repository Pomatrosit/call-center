import { FC } from "react";
import classes from "./MainNavigationItem.module.scss";
import { NavLink } from "react-router-dom";

interface IMainNavigationItemProps {
  title: string;
  path: string;
  Icon: FC;
}

interface IGetActiveLinkParameters {
  isActive: boolean;
}

const getActiveLink = ({ isActive }: IGetActiveLinkParameters): string =>
  isActive ? classes.activeNavLink : "";

const MainNavigationItem: FC<IMainNavigationItemProps> = ({
  title,
  path,
  Icon,
}) => {
  return (
    <div className={classes.navItem}>
      <NavLink to={path} className={getActiveLink}>
        <div className={classes.linkInner}>
          <Icon />
          <p className={classes.title}>{title}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default MainNavigationItem;
