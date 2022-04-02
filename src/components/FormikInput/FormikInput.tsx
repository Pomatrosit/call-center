import { Dispatch, FC, SetStateAction } from "react";
import classes from "./FormikInput.module.scss";
import { Form } from "react-bootstrap";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import { INPUT_FIELDS_NAMES } from "../../constants/inputFieldsNames";

interface IProps {
  label: string;
  name: string;
  type?: string;
  formik: any;
  autoComplete?: string;
  isMiddleName?: boolean;
  changeMiddleNameCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sex?: null | string;
  handleSexClick?: (sex: string) => void;
  sexError?: boolean;
  individual?: null | string;
  handleIndividualClick?: (individual: string) => void;
  individualError?: boolean;
  isRegionClicked?: boolean;
  setRegionClicked?: Dispatch<SetStateAction<boolean>>;
  isCityClicked?: boolean;
  setCityClicked?: Dispatch<SetStateAction<boolean>>;
  variant?: string | null | undefined;
}

const FormikInput: FC<IProps> = ({
  label,
  name,
  type = "text",
  formik,
  autoComplete,
  isMiddleName,
  changeMiddleNameCheckbox,
  sex,
  handleSexClick,
  sexError,
  individual,
  handleIndividualClick,
  individualError,
  isRegionClicked,
  setRegionClicked,
  isCityClicked,
  setCityClicked,
  variant,
}) => {
  // ДЛЯ ГОРОДА
  if (name === INPUT_FIELDS_NAMES.city) {
    return (
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
          {!isRegionClicked && <div className={classes.disableLayout}></div>}
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
    );
  }
  //// ДЛЯ РЕГИОНА
  if (name === INPUT_FIELDS_NAMES.region) {
    return (
      <div className={classes.formControl}>
        <div className={classes.formControlInner}>
          <label className={classes.label}>Регион</label>
          <AutocompleteInput
            apiUrl={autoComplete}
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
    );
  }
  // РАДИОКНОПКИ ДЛЯ СТАТУСА
  if (name === INPUT_FIELDS_NAMES.individual) {
    return (
      <div className={classes.formControl + " " + classes.smallMargin}>
        <div className={classes.formControlInner}>
          <label className={classes.label}>Статус</label>
          <div>
            <Form.Check
              inline
              checked={individual === "not individual"}
              label="Не ИП"
              name="notIndividual"
              type="radio"
              id="notIndividual"
              onClick={() => {
                if (handleIndividualClick)
                  handleIndividualClick("not individual");
              }}
              onChange={() => {}}
            />
            <Form.Check
              inline
              label="ИП"
              name="individual"
              type="radio"
              id="individual"
              checked={individual === "individual"}
              onClick={() => {
                if (handleIndividualClick) handleIndividualClick("individual");
              }}
              onChange={() => {}}
            />
          </div>
        </div>
        {individualError && (
          <p className={classes.validationError}>Проставьте СТАТУС клиента</p>
        )}
      </div>
    );
  }
  // РАДИОКНОПКИ ДЛЯ ПОЛА
  if (name === INPUT_FIELDS_NAMES.sex) {
    return (
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
              onClick={() => {
                if (handleSexClick) handleSexClick("male");
              }}
              onChange={() => {}}
            />
            <Form.Check
              inline
              label="Ж"
              name="female"
              type="radio"
              id="female"
              checked={sex === "female"}
              onClick={() => {
                if (handleSexClick) handleSexClick("female");
              }}
              onChange={() => {}}
            />
          </div>
        </div>
        {sexError && (
          <p className={classes.validationError}>Проставьте ПОЛ клиента</p>
        )}
      </div>
    );
  }

  // ДЛЯ ОТЧЕСТВА
  if (name === INPUT_FIELDS_NAMES.middleName) {
    return (
      <div className={classes.formControl + " " + classes.smallMargin}>
        <div className={classes.formControlInner}>
          <label
            className={classes.label}
            style={{ opacity: isMiddleName ? 1 : 0.5 }}
          >
            {label}
          </label>
          <AutocompleteInput
            disabled={!isMiddleName}
            apiUrl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
            {...formik.getFieldProps("middleName")}
            formik={formik}
            isInvalid={
              !!(formik.touched.middleName && formik.errors.middleName)
            }
            isValid={!!(formik.touched.middleName && !formik.errors.middleName)}
          />
          {!isMiddleName && <div className={classes.disableLayout}></div>}
        </div>
        {formik.touched.middleName &&
          formik.errors.middleName &&
          isMiddleName && (
            <p className={classes.validationError}>
              {formik.errors.middleName}
            </p>
          )}
        <Form.Group className={classes.cancelMiddleName}>
          <Form.Check
            type="checkbox"
            label="Убрать отчество"
            checked={!isMiddleName}
            onChange={changeMiddleNameCheckbox}
          />
        </Form.Group>
      </div>
    );
  }

  // ДЛЯ ИНПУТОВ С АВТОКОМПЛИТОМ
  if (autoComplete) {
    return (
      <div className={classes.formControl}>
        <div className={classes.formControlInner}>
          <label className={classes.label}>{label}</label>
          <AutocompleteInput
            apiUrl={autoComplete}
            isInvalid={!!(formik.touched[name] && formik.errors[name])}
            isValid={!!(formik.touched[name] && !formik.errors[name])}
            {...formik.getFieldProps(name)}
            formik={formik}
          />
        </div>
        {formik.touched[name] && formik.errors[name] && (
          <p className={classes.validationError}>{formik.errors[name]}</p>
        )}
      </div>
    );
  }

  // ДЛЯ ВСЕХ ОСТАЛЬНЫХ ИНПУТОВ

  return (
    <div
      className={
        classes.formControl +
        " " +
        `${type === "date" ? classes.dateFormControl : ""}` +
        " " +
        `${variant === "secondary" ? classes.variantSecondary : ""}`
      }
    >
      <div className={classes.formControlInner}>
        <label className={classes.label}>{label}</label>
        <Form.Control
          isInvalid={!!(formik.touched[name] && formik.errors[name])}
          isValid={
            !!(
              formik.touched[name] &&
              !formik.errors[name] &&
              name !== "password"
            ) && name !== "login"
          }
          type={type || "text"}
          {...formik.getFieldProps(name)}
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className={classes.validationError}>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default FormikInput;
