import { FC } from "react"
import classes from "./Logo.module.scss"

const Logo: FC = () => {
  return (
    <div className={classes.logo}>
      <img className={classes.logo__img} src='/logo.png' alt='logo' />
      <h1 className={classes.logo__title}>Contact Center № 1</h1>
    </div>
  )
}

export default Logo
