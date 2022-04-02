import classes from "./InternalServerError.module.scss";

const InternalServerError = () => {
  return (
    <div className={classes.root}>
      <div className={classes.internalServerError}>
        <h1 className={classes.title}>INTERNAL SERVER ERROR</h1>
        <img src="/internalServerError.png" alt="error" />
      </div>
    </div>
  );
};

export default InternalServerError;
