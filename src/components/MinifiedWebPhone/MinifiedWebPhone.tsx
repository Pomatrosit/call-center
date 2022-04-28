import { useEffect, useRef } from "react";
import { disableBrowserAutocomplete } from "../../helpers/inputs";
import {
  applyMinifiedWebPhoneMasks,
  destroyMinifiedWebPhoneMasks,
} from "../../helpers/masks";
import classes from "./MinifiedWebPhone.module.scss";
import * as Yup from "yup";
import FormikInput from "../FormikInput/FormikInput";
import { FormikProps, useFormik } from "formik";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { IWebPhoneTransferValues, IWebPhoneValues } from "../WebPhone/WebPhone";
import PhoneIcons from "../PhoneIcons/PhoneIcons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  setMinifiedWebPhone,
  setWebPhoneTransferValues,
} from "../../store/webphone/actions";
import PhoneResult from "../PhoneResult/PhoneResult";
import { useAppSelector } from "../../hooks/useAppSelector";

const initialValues: IWebPhoneValues = {
  phone: "",
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .min(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
    .max(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
    .required("Проставьте ТЕЛЕФОН клиента"),
});

const MinifiedWebPhone = () => {
  const $root = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: IWebPhoneValues) => {
    console.log(values);
  };

  const formik: FormikProps<IWebPhoneValues> = useFormik<IWebPhoneValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    disableBrowserAutocomplete($root.current);
    applyMinifiedWebPhoneMasks();

    return () => {
      destroyMinifiedWebPhoneMasks();
    };
  }, []);

  const currentPhone = useAppSelector((state) => state.webPhone.currentPhone);

  useEffect(() => {
    if (currentPhone) formik.setFieldValue("phone", currentPhone);
    //eslint-disable-next-line
  }, [currentPhone]);

  const rollUpClickHandler = () => {
    dispatch(setMinifiedWebPhone(false));
  };

  const createBidFromPhone = () => {
    if (formik.values?.phone?.trim().length !== 11) {
      formik.setFieldTouched("phone", true);
      return;
    }

    const values: IWebPhoneTransferValues = {};
    if (formik.values.phone) {
      values.phone = formik.values.phone.trim();
    }
    navigate("/createbid");
    dispatch(setWebPhoneTransferValues(values));
  };

  const isMinified = useAppSelector((state) => state.webPhone.isMinified);

  return (
    <div
      className={classes.root + " minified-web-phone-root"}
      ref={$root}
      style={{ display: isMinified ? "block" : "none" }}
    >
      <div className={classes.bgImgWrapper}>
        <img
          src="/logotype.svg"
          alt="background"
          className={classes.backgroundImg}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.head}>
          <p className={classes.title}>Веб-телефон</p>
          <div
            className={classes.rollup}
            data-tip={"Развернуть"}
            onClick={rollUpClickHandler}
          ></div>
        </div>
        <form>
          <FormikInput placeholder="Телефон" name="phone" formik={formik} />
          <PhoneIcons formik={formik} minified={true} />
          <div className={classes.createBidWrapper}>
            <Button variant="success" onClick={createBidFromPhone}>
              Создать заявку
            </Button>
          </div>
          <PhoneResult />
        </form>
      </div>
      <ReactTooltip delayShow={500} globalEventOff={"click"} />
    </div>
  );
};

export default MinifiedWebPhone;
