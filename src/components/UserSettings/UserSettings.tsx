import { FC } from "react"
import classes from "./UserSettings.module.scss"
import UserIcon from "../Icons/UserIcon"
import { useAppSelector } from "../../hooks/useAppSelector"

const UserSettings: FC = () => {
  const { firstName, lastName } = useAppSelector((state) => state.user)

  return (
    <div className={classes.userSettings}>
      <div className={classes.userIcon}>
        <UserIcon />
      </div>
      <div>
        <p className={classes.userName}>{lastName + " " + firstName}</p>
        <p className={classes.exitBtn}>Выход</p>
      </div>
    </div>
  )
}

export default UserSettings
