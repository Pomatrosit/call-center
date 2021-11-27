import { FC } from "react"
import classes from "./Header.module.scss"
import Logo from "../Logo/Logo"
import Status from "../Status/Status"
import UserSettings from "../UserSettings/UserSettings"

const Header: FC = () => {
  return (
    <section className={classes.header}>
      <div className={classes.appWrapper}>
        <Logo />
        <div className={classes.pinCode}>Пин-код: 1234</div>
        <Status />
        <UserSettings />
      </div>
    </section>
  )
}

export default Header
