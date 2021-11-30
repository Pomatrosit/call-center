import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { setAuth } from "../../store/auth/actions";
import style from "./Auth.module.scss";
import cls from "classnames";

const enum ErrorCode {
  BadRequest = 400, // Неверный пароль
  NotFound = 404, // Неверный логин
  Internal = 500, // Вутренняя ошибка сервера
}

// TODO: use auth api
const authMock = async (login: string, pwd: string) => {
  if (login === "123123") {
    if (pwd === "123123") {
      return {};
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
};

const Auth: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [checked, setChecked] = useState(false);

  const [errors, setErrors] = useState({
    isLoginEmpty: false,
    isPwdEmpty: false,
    isLoginFailed: false,
    isPwdFailed: false,
    isInternalErr: false,
  });

  const loginBtnClickHandler = async () => {
    if (login.trim() === "") {
      setErrors({ ...errors, isLoginEmpty: true });
      return;
    } else if (pwd.trim() === "") {
      setErrors({ ...errors, isPwdEmpty: true });
      return;
    }

    try {
      // Добавить запрос с обработкой ошибок
      const res = await authMock(login, pwd);

      navigate("/");
      dispatch(setAuth(true));
    } catch (e) {
      setErrors({ ...errors, isLoginFailed: true, isPwdFailed: true });
    }
  };

  return (
    <div className={style.auth}>
      <div className={style.logo}>
        <Logo />
      </div>

      <h3 className={style.marginTop}>Авторизация</h3>

      <Form>
        <Form.Group className={style.marginTop} controlId="login">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            isInvalid={errors.isLoginEmpty || errors.isLoginFailed}
            placeholder="Введите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            onBlur={() =>
              setErrors({ ...errors, isLoginEmpty: login.trim() === "" })
            }
          />

          {(errors.isLoginEmpty || errors.isLoginFailed) && (
            <Form.Text className={style.dangerText}>
              {errors.isLoginEmpty
                ? "Заполните поле"
                : "Вы ввели неверный логин"}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className={style.marginTop} controlId="pwd">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            isInvalid={errors.isPwdEmpty || errors.isPwdFailed}
            type="password"
            placeholder="Введите пароль"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onBlur={() =>
              setErrors({ ...errors, isPwdEmpty: pwd.trim() === "" })
            }
          />

          {(errors.isPwdEmpty || errors.isPwdFailed) && (
            <Form.Text className={style.dangerText}>
              {errors.isPwdEmpty
                ? "Заполните поле"
                : "Вы ввели неверный пароль"}
            </Form.Text>
          )}
        </Form.Group>

        {!errors.isInternalErr && (
          <p className={cls(style.error, style.marginTop)}>
            Произошла внутренняя ошибка
          </p>
        )}

        <Form.Group className={style.marginTop} controlId="checkbox">
          <Form.Check
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
            label="Запомнить меня"
          />
        </Form.Group>

        <Button
          className={cls(style.marginTop, style.button)}
          variant="success"
          onClick={() => loginBtnClickHandler()}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default Auth;
