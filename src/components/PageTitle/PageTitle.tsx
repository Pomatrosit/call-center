import { FC } from "react";
import classes from "./PageTitle.module.scss";

interface IProps {
  title: string;
  Icon: FC;
}

const PageTitle: FC<IProps> = ({ title, Icon }) => {
  return (
    <div className={classes.pageTitle}>
      <h4 className={classes.title}>
        <Icon />
        <span>{title}</span>
      </h4>
      <div className={classes.divider}></div>
    </div>
  );
};

export default PageTitle;
