import { FC } from "react";
import classes from "./WebPhone.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button } from "react-bootstrap";
import PhoneIcons from "../PhoneIcons/PhoneIcons";

interface IValues {
  phone: string;
  redirect: string;
}

const tonesButtons = () => {
  const tones = [];
  for (let i = 1; i <= 9; i++) {
    tones.push(i);
  }
  tones.push(0);
  return tones;
};

const WebPhone: FC = () => {
  const initialValues: IValues = {
    phone: "",
    redirect: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string(),
    redirect: Yup.string(),
  });

  const onSubmit = async (values: IValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form
      className={classes.webPhone}
      // onSubmit={formik.handleSubmit}
    >
      <FormikInput label="Телефон" name="login" formik={formik} />
      <div className={classes.redirectWrapper}>
        <div className={classes.redirectInput}>
          <FormikInput label="Переадресация" name="login" formik={formik} />
        </div>
        <Button variant="success" className={classes.redirectButton}>
          <img src="/icons/arrow.svg" alt="redirect-icon" />
        </Button>
      </div>
      <div className={classes.tone}>
        {tonesButtons().map((btn) => (
          <div key={btn} className={classes.btnTone}>
            <Button variant="warning">{btn}</Button>
          </div>
        ))}
      </div>
      <PhoneIcons />
    </form>
  );
};

export default WebPhone;
