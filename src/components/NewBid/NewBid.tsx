import React, { FC, useEffect, useMemo, useState } from "react";
import classes from "./NewBid.module.scss";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  loadingErrorMessage,
  emptyProductMessage,
} from "../../constants/messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyMasks, destroyMasks } from "../../helpers/newBidMasks";
import { disableBrowserAutocomplete } from "../../helpers/inputs";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import {
  dateNow,
  get30DaysAfterNow,
  getDateSomeYearsAgo,
} from "../../helpers/date";

interface IProducts {
  list: any[];
  isLoading: boolean;
  error: string | null;
  active: number;
}

interface IValues {
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  region: string;
  city: string;
  visitDate: string;
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

  const changeMiddleNameCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleName(!e.target.checked);

    //to do подумать как обойтись без таймаута
    setTimeout(() => {
      formik.validateField("middleName");
    }, 200);
  };

  const asideSubmitBtnClick = () => {
    if (!sex) setSexError(true);
    if (!individual) setIndividualError(true);
  };

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
    console.log(values);
  };

  //// Новая схема валидации будет перезаписываться при изменении видимости поля Отчество

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
        .min("01.01.1920", "Проверьте правильность введенной ДАТЫ")
        .max(`${getDateSomeYearsAgo(18)}`, "Клиенту нет 18 лет")
        .required("Проверьте правильность введенной ДАТЫ"),
      region: Yup.string().required("Проставьте РЕГИОН"),
      city: Yup.string().required("Проставьте НАСЕЛЕННЫЙ ПУНКТ"),
      visitDate: Yup.date()
        .min(
          dateNow(),
          "Дата ВИЗИТА В БАНК не может быть раньше сегодняшнего дня"
        )
        .max(
          get30DaysAfterNow(),
          "Дата ВИЗИТА В БАНК не может быть позднее 30 дней с сегодняшнего дня"
        ),
    });
  }, [isMiddleName]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validateOnChange: true,
  });

  const loadProducts = async () => {
    setProducts((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users?limit=10"
      );
      setProducts((prev) => ({
        ...prev,
        list: Array.isArray(response?.data) ? response.data : [],
        active: Array.isArray(response?.data) ? response.data[0].id : 0,
      }));
    } catch (e) {
      setProducts((prev) => ({ ...prev, error: loadingErrorMessage }));
    } finally {
      setProducts((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleProductClick = (id: number): void => {
    if (id === 10) setPasspordFields(true);
    else setPasspordFields(false);
    setProducts((prev) => ({ ...prev, active: id }));
  };

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

    loadProducts();

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

  return (
    <form className={classes.newBid} onSubmit={formik.handleSubmit}>
      <h4>Создание заявки</h4>
      <hr />
      <div className={classes.main}>
        <div className={classes.leftSide}>
          <h5 className={classes.subtitle}>Продукт</h5>
          {products.isLoading ? (
            <div className={classes.loader}>
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : products.error ? (
            <p className={classes.errorMessage}>{loadingErrorMessage}</p>
          ) : !products.list.length ? (
            <p className={classes.emptyMessage}>{emptyProductMessage}</p>
          ) : (
            products.list.map((product) => (
              <Form.Check
                key={product.id}
                type="radio"
                label={product.username}
                id={product.id}
                checked={product.id === products.active}
                onChange={() => handleProductClick(product.id)}
              />
            ))
          )}
        </div>

        <div className={classes.midSide}>
          <h5 className={classes.subtitle}>Данные клиента</h5>

          {/* Телефон */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Телефон</label>
              <Form.Control
                isInvalid={!!(formik.touched.phone && formik.errors.phone)}
                isValid={!!(formik.touched.phone && !formik.errors.phone)}
                type="text"
                maxLength={11}
                {...formik.getFieldProps("phone")}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className={classes.validationError}>{formik.errors.phone}</p>
            )}
          </div>

          {/* Фамилия */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Фамилия</label>
              <AutocompleteInput
                apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
                {...formik.getFieldProps("lastName")}
                formik={formik}
                isInvalid={
                  !!(formik.touched.lastName && formik.errors.lastName)
                }
                isValid={!!(formik.touched.lastName && !formik.errors.lastName)}
              />
            </div>

            {formik.touched.lastName && formik.errors.lastName && (
              <p className={classes.validationError}>
                {formik.errors.lastName}
              </p>
            )}
          </div>

          {/* Имя */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Имя</label>
              <AutocompleteInput
                apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
                {...formik.getFieldProps("firstName")}
                formik={formik}
                isInvalid={
                  !!(formik.touched.firstName && formik.errors.firstName)
                }
                isValid={
                  !!(formik.touched.firstName && !formik.errors.firstName)
                }
              />
            </div>

            {formik.touched.firstName && formik.errors.firstName && (
              <p className={classes.validationError}>
                {formik.errors.firstName}
              </p>
            )}
          </div>

          {/* Отчество */}
          <div className={classes.formControl + " " + classes.smallMargin}>
            <div className={classes.formControlInner}>
              <label
                className={classes.label}
                style={{ opacity: isMiddleName ? 1 : 0.5 }}
              >
                Отчество
              </label>
              <AutocompleteInput
                disabled={!isMiddleName}
                apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
                {...formik.getFieldProps("middleName")}
                formik={formik}
                isInvalid={
                  !!(formik.touched.middleName && formik.errors.middleName)
                }
                isValid={
                  !!(formik.touched.middleName && !formik.errors.middleName)
                }
              />
              {!isMiddleName && <div className={classes.disableLayout}></div>}
            </div>
            {formik.touched.middleName && formik.errors.middleName && (
              <p className={classes.validationError}>
                {formik.errors.middleName}
              </p>
            )}
            <Form.Group className={classes.cancelMiddleName}>
              <Form.Check
                type="checkbox"
                label="Без отчества"
                checked={!isMiddleName}
                onChange={changeMiddleNameCheckbox}
              />
            </Form.Group>
          </div>

          {/* Пол */}
          <div className={classes.formControl + " " + classes.smallMargin}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Пол</label>
              <div>
                <Form.Check
                  inline
                  checked={sex === "male"}
                  label="M"
                  name="male"
                  type="radio"
                  id="male"
                  onClick={() => handleSexClick("male")}
                  onChange={() => {}}
                />
                <Form.Check
                  inline
                  label="Ж"
                  name="female"
                  type="radio"
                  id="female"
                  checked={sex === "female"}
                  onClick={() => handleSexClick("female")}
                  onChange={() => {}}
                />
              </div>
            </div>
            {sexError && (
              <p className={classes.validationError}>Проставьте ПОЛ клиента</p>
            )}
          </div>

          {/* Статус лица */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Статус лица</label>
              <div>
                <Form.Check
                  inline
                  checked={individual === "not individual"}
                  label="Не ИП"
                  name="notIndividual"
                  type="radio"
                  id="notIndividual"
                  onClick={() => handleIndividualClick("not individual")}
                  onChange={() => {}}
                />
                <Form.Check
                  inline
                  label="ИП"
                  name="individual"
                  type="radio"
                  id="individual"
                  checked={individual === "individual"}
                  onClick={() => handleIndividualClick("individual")}
                  onChange={() => {}}
                />
              </div>
            </div>
            {individualError && (
              <p className={classes.validationError}>
                Проставьте СТАТУС клиента
              </p>
            )}
          </div>

          {/* Дата рождения */}
          <div className={classes.formControl + " " + classes.dateFormControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Дата рождения</label>
              <Form.Control
                as="input"
                htmlSize={10}
                isInvalid={
                  !!(formik.touched.birthDate && formik.errors.birthDate)
                }
                isValid={
                  !!(formik.touched.birthDate && !formik.errors.birthDate)
                }
                type="date"
                {...formik.getFieldProps("birthDate")}
              />
            </div>
            {formik.touched.birthDate && formik.errors.birthDate && (
              <p className={classes.validationError}>
                {formik.errors.birthDate}
              </p>
            )}
          </div>

          {/* Регион */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Регион</label>
              <AutocompleteInput
                apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
                {...formik.getFieldProps("region")}
                formik={formik}
                isInvalid={
                  !!(formik.touched.region && formik.errors.region) ||
                  (!isRegionClicked && !!formik.touched.region)
                }
                isValid={
                  !!(
                    formik.touched.region &&
                    !formik.errors.region &&
                    isRegionClicked
                  )
                }
                setClicked={setRegionClicked}
              />
            </div>
            {formik.touched.region && formik.errors.region ? (
              <p className={classes.validationError}>{formik.errors.region}</p>
            ) : !isRegionClicked && !!formik.touched.region ? (
              <p className={classes.validationError}>
                Нужно выбрать РЕГИОН из выпадающего списка
              </p>
            ) : null}
          </div>

          {/* Город */}
          <div className={classes.formControl}>
            <div className={classes.formControlInner}>
              <label
                className={classes.label}
                style={{ opacity: isRegionClicked ? 1 : 0.5 }}
              >
                Город
              </label>
              <AutocompleteInput
                apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
                {...formik.getFieldProps("city")}
                formik={formik}
                isInvalid={
                  !!(formik.touched.city && formik.errors.city) ||
                  (!isCityClicked && !!formik.touched.city)
                }
                isValid={!!(formik.touched.city && !formik.errors.city)}
                setClicked={setCityClicked}
              />
              {!isRegionClicked && (
                <div className={classes.disableLayout}></div>
              )}
            </div>

            {isRegionClicked &&
              (formik.touched.city && formik.errors.city ? (
                <p className={classes.validationError}>{formik.errors.city}</p>
              ) : !isCityClicked && !!formik.touched.city ? (
                <p className={classes.validationError}>
                  Нужно выбрать НАСЕЛЕННЫЙ ПУНКТ из выпадающего списка
                </p>
              ) : null)}
          </div>

          {/* Дата визита в банк */}
          <div className={classes.formControl + " " + classes.dateFormControl}>
            <div className={classes.formControlInner}>
              <label className={classes.label}>Дата визита в банк</label>
              <Form.Control
                isInvalid={
                  !!(formik.touched.visitDate && formik.errors.visitDate)
                }
                isValid={
                  !!(formik.touched.visitDate && !formik.errors.visitDate)
                }
                type="date"
                {...formik.getFieldProps("visitDate")}
              />
            </div>
            {formik.touched.visitDate && formik.errors.visitDate && (
              <p className={classes.validationError}>
                {formik.errors.visitDate}
              </p>
            )}
          </div>

          {isPassportFields && (
            <>
              <hr className={classes.additionalFieldsDivider} />
              <div>
                <h5 className={classes.subtitle}>Паспортные данные</h5>
              </div>
            </>
          )}
        </div>

        <div className={classes.rightSide}>
          <h5 className={classes.subtitle}>Статус</h5>
          <Form.Check type="radio" label="Не указано" />
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
  );
};

export default NewBid;
