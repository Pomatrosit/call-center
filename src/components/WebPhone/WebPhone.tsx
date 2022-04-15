import { FC, useEffect, useRef } from "react";
import classes from "./WebPhone.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button } from "react-bootstrap";
import PhoneIcons from "../PhoneIcons/PhoneIcons";
import { disableBrowserAutocomplete } from "../../helpers/inputs";
import { applyWebPhoneMasks } from "../../helpers/masks";
import PhoneResult from "../PhoneResult/PhoneResult";

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
  const $root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    disableBrowserAutocomplete($root.current);
    applyWebPhoneMasks();
  }, []);

  const initialValues: IValues = {
    phone: "",
    redirect: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .min(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
      .max(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
      .required("Проставьте ТЕЛЕФОН клиента"),
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
    <div ref={$root} className="web-phone-root">
      <form
        className={classes.webPhone}
        // onSubmit={formik.handleSubmit}
      >
        <FormikInput label="Телефон" name="phone" formik={formik} />
        <div className={classes.redirectWrapper}>
          <div className={classes.redirectInput}>
            <FormikInput
              label="Переадресация"
              name="redirect"
              formik={formik}
            />
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
        <PhoneResult />
        <PhoneIcons formik={formik} />
      </form>
    </div>
  );
};

export default WebPhone;
