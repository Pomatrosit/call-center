import React, { FC, useEffect, useMemo, useState } from "react";
import classes from "./NewBid.module.scss";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyMasks, destroyMasks } from "../../helpers/masks";
import { disableBrowserAutocomplete } from "../../helpers/inputs";
import {
  yesterday,
  get30DaysAfterNow,
  getDateSomeYearsAgo,
} from "../../helpers/date";
import FormikInput from "../FormikInput/FormikInput";
import BidProducts, { IProducts } from "../BidProducts/BidProducts";
import AddBidIcon from "../Icons/AddBidIcon";
import PageTitle from "../PageTitle/PageTitle";

interface IValues {
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  region: string;
  city: string;
  visitDate: string;
  sex?: string;
  individual?: string;
  passportSeries: string;
  passportNumber: string;
  passportCode: string;
  passportDate: string;
  creditDuration: string;
  creditAmount: string;
  comment?: string;
}

const initialValues: IValues = {
  phone: "",
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  region: "",
  city: "",
  visitDate: "",
  passportSeries: "",
  passportNumber: "",
  passportCode: "",
  passportDate: "",
  creditDuration: "",
  creditAmount: "",
};

const NewBid: FC = () => {
  const [products, setProducts] = useState<IProducts>({
    list: [],
    isLoading: false,
    error: null,
    active: 0,
  });

  const [isMiddleName, setMiddleName] = useState<boolean>(true);
  const [sex, setSex] = useState<null | string>(null);
  const [sexError, setSexError] = useState<boolean>(false);
  const [individual, setIndividual] = useState<null | string>(null);
  const [individualError, setIndividualError] = useState<boolean>(false);
  const [isRegionClicked, setRegionClicked] = useState<boolean>(false);
  const [isCityClicked, setCityClicked] = useState<boolean>(false);
  const [isPassportFields, setPasspordFields] = useState<boolean>(false);
  const [isCreditFields, setCreditFields] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const changeMiddleNameCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleName(!e.target.checked);
  };

  const asideSubmitBtnClick = () => {
    if (!sex) setSexError(true);
    if (!individual) setIndividualError(true);
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      phone: Yup.string()
        .min(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
        .max(11, "Проверьте правильность введенного НОМЕРА ТЕЛЕФОНА")
        .required("Проставьте ТЕЛЕФОН клиента"),
      lastName: Yup.string().required("Проставьте ФАМИЛИЮ клиента"),
      firstName: Yup.string().required("Проставьте ИМЯ клиента"),
      middleName: isMiddleName
        ? Yup.string().required("Проставьте ОТЧЕСТВО клиента")
        : Yup.string(),
      birthDate: Yup.date()
        .min(
          `${getDateSomeYearsAgo(100)}`,
          "Проверьте правильность введенной ДАТЫ"
        )
        .max(`${getDateSomeYearsAgo(18)}`, "Клиенту нет 18 лет")
        .required("Проверьте правильность введенной ДАТЫ"),
      region: Yup.string().required("Проставьте РЕГИОН"),
      city: Yup.string().required("Проставьте НАСЕЛЕННЫЙ ПУНКТ"),
      visitDate: Yup.date()
        .min(
          yesterday(),
          "Дата ВИЗИТА В БАНК не может быть раньше сегодняшнего дня"
        )
        .max(
          get30DaysAfterNow(),
          "Дата ВИЗИТА В БАНК не может быть позднее 30 дней с сегодняшнего дня"
        )
        .required("Проверьте правильность введенной ДАТЫ"),
      passportSeries: isPassportFields
        ? Yup.string()
            .min(4, "Проверьте правильность введенной СЕРИИ ПАСПОРТА")
            .max(4, "Проверьте правильность введенной СЕРИИ ПАСПОРТА")
            .required("Проставьте СЕРИЮ ПАСПОРТА")
        : Yup.string(),
      passportNumber: isPassportFields
        ? Yup.string()
            .min(6, "Проверьте правильность введенного НОМЕРА ПАСПОРТА")
            .max(6, "Проверьте правильность введенного НОМЕРА ПАСПОРТА")
            .required("Проставьте НОМЕР ПАСПОРТА")
        : Yup.string(),
      passportCode: isPassportFields
        ? Yup.string()
            .min(7, "Проверьте правильность введенного КОДА ПОДРАЗДЕЛЕНИЯ")
            .max(7, "Проверьте правильность введенного КОДА ПОДРАЗДЕЛЕНИЯ")
            .required("Проставьте КОД ПОДРАЗДЕЛЕНИЯ")
        : Yup.string(),
      passportDate: isPassportFields
        ? Yup.date()
            .max(
              new Date(),
              "Дата ВЫДАЧИ ПАСПОРТА не может быть позднее сегодняшнего дня"
            )
            .min(
              `${getDateSomeYearsAgo(50)}`,
              "Проверьте правильность введенной ДАТЫ ВЫДАЧИ ПАСПОРТА"
            )
            .required("Проверьте правильность введенной ДАТЫ ВЫДАЧИ ПАСПОРТА")
        : Yup.date().nullable(),
      creditDuration: isCreditFields
        ? Yup.number()
            .min(1, "СРОК ЗАЙМА должен быть от 1 до 180 дней")
            .max(180, "СРОК ЗАЙМА должен быть от 1 до 180 дней")
            .required("Проставьте СРОК ЗАЙМА")
        : Yup.string(),
      creditAmount: isCreditFields
        ? Yup.number()
            .min(2000, "СУММА КРЕДИТА должна быть от 2000 до 100000 рублей")
            .max(100000, "СУММА КРЕДИТА должна быть от 2000 до 100000 рублей")
            .required("Проставьте СУММУ КРЕДИТА")
        : Yup.string(),
    });
  }, [isMiddleName, isPassportFields, isCreditFields]);

  const onSubmit = (values: IValues): void => {
    if (!sex) {
      setSexError(true);
      return;
    }
    if (!individual) {
      setIndividualError(true);
      return;
    }
    if (!isRegionClicked || !isCityClicked) return;
    values.sex = sex;
    values.individual = individual;
    values.middleName = isMiddleName ? values.middleName : "";
    values.comment = comment.trim();
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleSexClick = (sex: string): void => {
    setSex(sex);
    setSexError(false);
  };

  const handleIndividualClick = (individual: string): void => {
    setIndividual(individual);
    setIndividualError(false);
  };

  useEffect(() => {
    applyMasks();
    disableBrowserAutocomplete();

    return () => {
      destroyMasks();
      setProducts({
        list: [],
        isLoading: false,
        error: null,
        active: 0,
      });
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    formik.validateField("middleName");
    //eslint-disable-next-line
  }, [isMiddleName]);

  useEffect(() => {
    if (isPassportFields) {
      formik.setFieldTouched("passportSeries", false);
      formik.setFieldTouched("passportNumber", false);
      formik.setFieldTouched("passportCode", false);
      formik.setFieldTouched("passportDate", false);
      formik.setFieldValue("passportSeries", "");
      formik.setFieldValue("passportNumber", "");
      formik.setFieldValue("passportCode", "");
      formik.setFieldValue("passportDate", "");
      disableBrowserAutocomplete();
    }
    //eslint-disable-next-line
  }, [isPassportFields]);

  useEffect(() => {
    if (isCreditFields) {
      formik.setFieldTouched("creditDuration", false);
      formik.setFieldTouched("creditAmount", false);
      formik.setFieldValue("creditDuration", "");
      formik.setFieldValue("creditAmount", "");
      disableBrowserAutocomplete();
    }
    //eslint-disable-next-line
  }, [isCreditFields]);

  return (
    <div className={classes.root}>
      <form className={classes.newBid} onSubmit={formik.handleSubmit}>
        <PageTitle title="Создание заявки" Icon={AddBidIcon} />
        <div className={classes.main}>
          <div className={classes.leftSide}>
            <BidProducts
              products={products}
              setProducts={setProducts}
              setPasspordFields={setPasspordFields}
              setCreditFields={setCreditFields}
            />
          </div>

          <div className={classes.midSide}>
            <h5 className={classes.subtitle}>Данные клиента</h5>
            <FormikInput label="Телефон" name="phone" formik={formik} />
            <FormikInput
              label="Фамилия"
              name="lastName"
              formik={formik}
              autoComplete="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
            />
            <FormikInput
              label="Имя"
              name="firstName"
              formik={formik}
              autoComplete="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
            />
            <FormikInput
              label="Отчество"
              name="middleName"
              formik={formik}
              autoComplete="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
              isMiddleName={isMiddleName}
              changeMiddleNameCheckbox={changeMiddleNameCheckbox}
            />
            <FormikInput
              label="Пол"
              name="sex"
              formik={formik}
              sex={sex}
              handleSexClick={handleSexClick}
              sexError={sexError}
            />
            <FormikInput
              label="Статус"
              name="individual"
              formik={formik}
              individual={individual}
              handleIndividualClick={handleIndividualClick}
              individualError={individualError}
            />
            <FormikInput
              label="Дата рождения"
              name="birthDate"
              formik={formik}
              type="date"
            />
            <FormikInput
              label="Регион"
              name="region"
              formik={formik}
              autoComplete="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
              isRegionClicked={isRegionClicked}
              setRegionClicked={setRegionClicked}
            />
            <FormikInput
              label="Город"
              name="city"
              formik={formik}
              autoComplete="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
              isCityClicked={isCityClicked}
              setCityClicked={setCityClicked}
              isRegionClicked={isRegionClicked}
            />
            <FormikInput
              label="Дата визита в банк"
              name="visitDate"
              formik={formik}
              type="date"
            />

            <div style={{ display: isPassportFields ? "block" : "none" }}>
              <div className={classes.additionalFieldsDivider}></div>
              <div>
                <h5 className={classes.subtitle}>Дополнительные поля</h5>
                <FormikInput
                  label="Серия паспорта"
                  name="passportSeries"
                  formik={formik}
                />
                <FormikInput
                  label="Номер паспорта"
                  name="passportNumber"
                  formik={formik}
                />
                <FormikInput
                  label="Код подразделения"
                  name="passportCode"
                  formik={formik}
                />
                <FormikInput
                  label="Дата выдачи"
                  name="passportDate"
                  type="date"
                  formik={formik}
                />
              </div>
            </div>

            <div style={{ display: isCreditFields ? "block" : "none" }}>
              <div className={classes.additionalFieldsDivider}></div>
              <div>
                <h5 className={classes.subtitle}>Дополнительные поля</h5>
                <FormikInput
                  label="Срок займа"
                  name="creditDuration"
                  formik={formik}
                />
                <FormikInput
                  label="Сумма кредита"
                  name="creditAmount"
                  formik={formik}
                />
              </div>
            </div>
          </div>

          <div className={classes.rightSide}>
            <h5 className={classes.subtitle}>Статус</h5>
            <Form.Check type="radio" label="Не указано" />
          </div>

          <div className={classes.comment}>
            <h5 className={classes.subtitle}>Комментарий</h5>
            <Form.Control
              type="text"
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={classes.textarea}
            />
          </div>
        </div>

        <div className={classes.saveBtnWrapper}>
          <Button
            variant="success"
            type="submit"
            className={classes.saveBtn}
            onClick={asideSubmitBtnClick}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <img
        className={classes.newBidBackground}
        src="/newBidBackground.svg"
        alt="background"
      />
    </div>
  );
};

export default NewBid;
