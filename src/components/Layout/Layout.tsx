import React, { FC } from "react"
import classes from "./Layout.module.scss"
import Header from "../Header/Header"

const Layout: FC = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes.appWrapper}>{children}</div>
    </div>
  )
}

export default Layout
