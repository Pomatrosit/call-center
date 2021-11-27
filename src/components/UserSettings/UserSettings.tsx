import { FC } from "react"
import classes from "./UserSettings.module.scss"
import UserIcon from "../Icons/UserIcon"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useDispatch } from "react-redux"
import { setAuth } from "../../store/auth/actions"
import { useNavigate } from "react-router-dom"

const UserSettings: FC = () => {
  const { firstName, lastName } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutBtnClickHandler = () => {
    dispatch(setAuth(false))
    navigate("/auth")
  }

  return (
    <div className={classes.userSettings}>
      <div className={classes.userIcon}>
        <UserIcon />
      </div>
      <div className={classes.rightSide}>
        <p className={classes.userName}>{lastName + " " + firstName}</p>
        <p className={classes.exitBtn} onClick={logoutBtnClickHandler}>
          Выход
        </p>
      </div>
    </div>
  )
}

export default UserSettings
