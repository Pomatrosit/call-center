import { FC, useEffect, useRef, useState } from "react";
import classes from "./WebPhone.module.scss";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button } from "react-bootstrap";
import PhoneIcons from "../PhoneIcons/PhoneIcons";
import { disableBrowserAutocomplete } from "../../helpers/inputs";
import { applyWebPhoneMasks } from "../../helpers/masks";
import PhoneResult from "../PhoneResult/PhoneResult";
import ClientCard from "../ClientCard/ClientCard";
import { useDispatch } from "react-redux";
import {
  setMinifiedWebPhone,
  setWebPhoneTransferValues,
} from "../../store/webphone/actions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

export interface IWebPhoneValues {
  phone?: string;
  redirect?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  region?: string;
  city?: string;
}

export interface IWebPhoneTransferValues extends IWebPhoneValues {
  regionId?: number;
  cityId?: number;
  sex?: string;
  individual?: string;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const $root = useRef<HTMLDivElement>(null);
  const currentPhone = useAppSelector((state) => state.webPhone.currentPhone);

  useEffect(() => {
    if (currentPhone) formik.setFieldValue("phone", currentPhone);
    //eslint-disable-next-line
  }, [currentPhone]);

  const initialValues: IWebPhoneValues = {
    phone: "",
    redirect: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    region: "",
    city: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .min(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
      .max(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
      .required("Проставьте ТЕЛЕФОН клиента"),
    redirect: Yup.string(),
  });

  const onSubmit = async (values: IWebPhoneValues) => {
    console.log(values);
  };

  const formik: FormikProps<IWebPhoneValues> = useFormik<IWebPhoneValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const [sex, setSex] = useState<string>("");
  const [individual, setIndividual] = useState<string>("");

  const [isRegionClicked, setRegionClicked] = useState<boolean>(false);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [isCityClicked, setCityClicked] = useState<boolean>(false);
  const [cityId, setCityId] = useState<number | null>(null);

  const changeRegionId = (id: number) => {
    setRegionId(id);
  };

  const changeCityId = (id: number) => {
    setCityId(id);
  };

  const createBidFromPhone = () => {
    if (formik.values?.phone?.trim().length !== 11) {
      formik.setFieldTouched("phone", true);
      return;
    }

    const values: IWebPhoneTransferValues = {
      lastName: formik.values.lastName,
      firstName: formik.values.firstName,
      middleName: formik.values.middleName,
      birthDate: formik.values.birthDate,
      sex,
      individual,
    };
    if (formik.values.phone && formik.values.phone.trim().length === 11) {
      values.phone = formik.values.phone.trim();
    }
    if (isRegionClicked) {
      values.region = formik.values.region;
      if (regionId) values.regionId = regionId;
    }
    if (isCityClicked) {
      values.city = formik.values.city;
      if (cityId) values.cityId = cityId;
    }
    navigate("/createbid");
    dispatch(setWebPhoneTransferValues(values));
    dispatch(setMinifiedWebPhone(true));
  };

  useEffect(() => {
    disableBrowserAutocomplete($root.current);
    applyWebPhoneMasks();
  }, []);

  const isMinified = useAppSelector((state) => state.webPhone.isMinified);

  const onClose = () => {
    dispatch(setMinifiedWebPhone(true));
  };

  return (
    <div
      className={classes.webPhoneLayout}
      onClick={onClose}
      style={{ display: isMinified ? "none" : "flex" }}
    >
      <div
        className={classes.webPhoneLayout2}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.bgImgWrapper}>
          <img
            src="/logotype.svg"
            alt="background"
            className={classes.backgroundImg}
          />
        </div>
        <div ref={$root} className={classes.content + " web-phone-root"}>
          <div className={classes.head}>
            <h2 className={classes.title}>Веб-телефон</h2>
            <img
              onClick={onClose}
              className={classes.closeIcon}
              src="/icons/closeIcon.svg"
              alt="close-modal"
            />
          </div>
          <form className={classes.webPhone}>
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
            <div className={classes.saveBtnWrapper}>
              <Button variant="success" onClick={createBidFromPhone}>
                Создать заявку
              </Button>
            </div>
            <ClientCard
              formik={formik}
              sex={sex}
              setSex={setSex}
              individual={individual}
              setIndividual={setIndividual}
              isRegionClicked={isRegionClicked}
              setRegionClicked={setRegionClicked}
              changeRegionId={changeRegionId}
              regionId={regionId}
              isCityClicked={isCityClicked}
              setCityClicked={setCityClicked}
              changeCityId={changeCityId}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebPhone;
