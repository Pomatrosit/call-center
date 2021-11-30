import { FC } from "react"
import classes from "./MainNavigation.module.scss"
import MainNavigationItem from "../MainNavigationItem/MainNavigationItem"
import { MAIN_NAVIGATION_ITEMS } from "../../constants/mainNavigationItems"

const MainNavigation: FC = () => {
  return (
    <div className={classes.mainNavigation}>
      <div className={classes.appWrapper}>
        {MAIN_NAVIGATION_ITEMS.map((item) => (
          <MainNavigationItem
            key={item.id}
            title={item.title}
            path={item.path}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  )
}

export default MainNavigation
