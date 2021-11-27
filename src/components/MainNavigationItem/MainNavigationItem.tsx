import { FC } from "react"
import classes from "./MainNavigationItem.module.scss"
import { useNavigate } from "react-router-dom"

interface IMainNavigationItemProps {
  title: string
  path: string
  Icon: FC
}

const MainNavigationItem: FC<IMainNavigationItemProps> = ({
  title,
  Icon,
  path,
}) => {
  const navigate = useNavigate()

  return (
    <div className={classes.navItem} onClick={() => navigate(path)}>
      <Icon />
      <p className={classes.navItem__title}>{title}</p>
    </div>
  )
}

export default MainNavigationItem
