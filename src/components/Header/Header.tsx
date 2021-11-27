import { FC } from "react"
import classes from "./Header.module.scss"
import Logo from "../Logo/Logo"
import Status from "../Status/Status"
import UserSettings from "../UserSettings/UserSettings"
import CallSection from "../CallSection/CallSection"

const Header: FC = () => {
  return (
    <section className={classes.header}>
      <div className={classes.appWrapper}>
        <div className={classes.headerFirst}>
          <Logo />
          <div className={classes.pinCode}>Пин-код: 1234</div>
          <Status />
          <UserSettings />
        </div>
        <div className={classes.headerSecond}>
          <CallSection />
        </div>
      </div>
    </section>
  )
}

export default Header
