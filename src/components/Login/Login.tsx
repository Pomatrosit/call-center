import { useFormik } from "formik";
import { FC, useState } from "react";
import classes from "./Login.module.scss";
import * as Yup from "yup";
import FormikInput from "../FormikInput/FormikInput";
import { Button } from "react-bootstrap";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth/actions";
import { TOKENS } from "../../constants/common";
import { HTTP_STATUS_CODES } from "../../constants/statusCodes";
import { setUser } from "../../store/user/actions";

interface IValues {
  login: string;
  password: string;
}

const initialValues: IValues = {
  login: "",
  password: "",
};

const validationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const Auth: FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");

  const onSubmit = (values: IValues) => {
    setError("");
    axios
      .post("auth/login", values)
      .then((response: AxiosResponse) => {
        const { accessToken, refreshToken } = response.data.tokens;
        const { name, surname } = response.data;
        sessionStorage.setItem(TOKENS.accessToken, accessToken);
        sessionStorage.setItem(TOKENS.refreshToken, refreshToken);
        sessionStorage.setItem("firstName", name);
        sessionStorage.setItem("lastName", surname);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        dispatch(setUser({ firstName: name, lastName: surname }));
        dispatch(setAuth(true));
      })
      .catch((reason: AxiosError) => {
        if (
          reason.response?.data?.statusCode === HTTP_STATUS_CODES.BAD_REQUEST
        ) {
          setError("Ошибка авторизации, некорректный логин или пароль");
        } else {
          setError("Неизвестная ошибка сервера");
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <form className={classes.auth} onSubmit={formik.handleSubmit}>
        <div className={classes.logo}>
          <img src="/logotype.svg" alt="logo" className={classes.logotype} />
          <h2>Contact Center</h2>
        </div>
        <h3 className={classes.marginTop}>Авторизация</h3>
        <FormikInput
          label="Логин"
          name="login"
          formik={formik}
          variant="secondary"
        />
        <FormikInput
          label="Пароль"
          name="password"
          formik={formik}
          variant="secondary"
          type="password"
        />
        {error !== "" && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.sendBtnWrapper}>
          <Button variant="success" type="submit">
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

export default Auth;
