import { FC } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAuth } from "../store/auth/actions"

const Auth: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginBtnClickHandler = () => {
    navigate("/")
    dispatch(setAuth(true))
  }

  return (
    <div style={{ margin: "200px auto", width: 100 }}>
      AUTH
      <Button variant='success' onClick={loginBtnClickHandler}>
        Войти
      </Button>
    </div>
  )
}

export default Auth
