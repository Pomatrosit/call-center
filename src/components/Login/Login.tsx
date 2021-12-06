import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { setAuth } from "../../store/auth/actions";
import style from "./Login.module.scss";
import cls from "classnames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUser } from "../../store/user/actions";

const enum ErrorCode {
  BadRequest = 400, // Неверный пароль
  NotFound = 404, // Неверный логин
  Internal = 500, // Вутренняя ошибка сервера
}

const HOST = "http://192.168.1.250:3050";

const defaultErr = {
  isLoginEmpty: false,
  isPwdEmpty: false,
  isLoginFailed: false,
  isPwdFailed: false,
  isInternalErr: false,
}

const Auth: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [checked, setChecked] = useState(false);

  const [errors, setErrors] = useState({ ...defaultErr });

  const loginBtnClickHandler = async () => {
    if (login.trim() === "") {
      setErrors({ ...defaultErr, isLoginEmpty: true });
      return;
    } else if (pwd.trim() === "") {
      setErrors({ ...defaultErr, isPwdEmpty: true });
      return;
    }

    try {
      const path = `${HOST}/auth?login=${login}&password=${pwd}`;
      let response = await fetch(path);

      if (response.ok) {
        const { token, user } = await response.json();

        console.log('auth token', token);

        dispatch(setUser(user));

        navigate("/");
        dispatch(setAuth(true));
      } else {
        switch (response.status) {
          case ErrorCode.BadRequest: {
            return setErrors({ ...defaultErr, isPwdFailed: true });
          }

          case ErrorCode.NotFound: {
            return setErrors({ ...defaultErr, isLoginFailed: true });
          }

          default: {
            return setErrors({ ...defaultErr, isInternalErr: true });
          }
        }
      }
    } catch (e) {
      setErrors({ ...defaultErr, isInternalErr: true });
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

        {errors.isInternalErr && (
          <p className={cls(style.error, style.marginTop)}>
            Произошла внутренняя ошибка
          </p>
        )}

        <Form.Group className={style.marginTop} controlId="checkbox">
          <Form.Check
            className={style.check}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
            label="Запомнить меня"
          />
        </Form.Group>

        <Button
          className={cls(style.button)}
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
