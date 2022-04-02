import { useFormik } from "formik";
import { FC, useState } from "react";
import Logo from "../../components/Logo";
import classes from "./Login.module.scss";
import * as Yup from "yup";
import FormikInput from "../FormikInput/FormikInput";
import { Button } from "react-bootstrap";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth/actions";
import { TOKENS } from "../../constants/common";
import { HTTP_STATUS_CODES } from "../../constants/statusCodes";

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
        const { accessToken, refreshToken } = response.data;
        sessionStorage.setItem(TOKENS.accessToken, accessToken);
        sessionStorage.setItem(TOKENS.refreshToken, refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
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
    <form className={classes.auth} onSubmit={formik.handleSubmit}>
      <div className={classes.logo}>
        <Logo />
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
  );
};

export default Auth;
