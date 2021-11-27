import { FC } from "react"
import classes from "./Layout.module.scss"
import Header from "../Header/Header"
import MainNavigation from "../MainNavigation/MainNavigation"

const Layout: FC = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <MainNavigation />
      <div className={classes.appWrapper}>{children}</div>
    </div>
  )
}

export default Layout
