import React, { FC, useEffect, useState } from "react";
import classes from "./NewBid.module.scss";
import BootstrapInput from "../BootstrapInput/BootstrapInput";
import { NEW_BIDS_FORM_CONTROLS } from "../../constants/newBid";
import { initialInputState } from "../../constants/initialInputState";
import { IFormControl } from "../../common-types/formControl";
import { STATUS_SELECT_OPTIONS } from "../../constants/statusSelectOptions";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import IMask from "imask";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { loadingErrorMessage } from "../../constants/messages";

interface INewBidFormState {
  phone: IFormControl;
  firstName: IFormControl;
  lastName: IFormControl;
  middleName: IFormControl;
  status: IFormControl;
  birthDate: IFormControl;
  region: IFormControl;
  city: IFormControl;
  visitDate: IFormControl;
  insurance: IFormControl;
}

interface IProducts {
  list: any[];
  isLoading: boolean;
  error: string | null;
  active: number;
}

const NewBid: FC = () => {
  const [form, setForm] = useState<INewBidFormState>({
    phone: initialInputState,
    firstName: initialInputState,
    lastName: initialInputState,
    middleName: initialInputState,
    status: {
      ...initialInputState,
      selectOptions: STATUS_SELECT_OPTIONS,
    },
    birthDate: initialInputState,
    region: {
      ...initialInputState,
      apiUrl: "https://jsonplaceholder.typicode.com/users?limit=10",
    },
    city: {
      ...initialInputState,
      apiUrl: "https://jsonplaceholder.typicode.com/users?limit=10",
    },
    visitDate: initialInputState,
    insurance: initialInputState,
  });

  const [products, setProducts] = useState<IProducts>({
    list: [],
    isLoading: false,
    error: null,
    active: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: INewBidFormState) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name as keyof INewBidFormState],
        value: e.target.value,
        isError: false,
        errorMessage: null,
      },
    }));
  };

  const handleAutocompleteChange = (name: string, value: string): void => {
    setForm((prev: INewBidFormState) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof INewBidFormState],
        value: value,
        isError: false,
        errorMessage: null,
      },
    }));
  };

  const loadProducts = async () => {
    setProducts((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users?limit=10"
      );
      setProducts((prev) => ({ ...prev, list: response.data }));
    } catch (e) {
      setProducts((prev) => ({ ...prev, error: loadingErrorMessage }));
    } finally {
      setProducts((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleProductClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts((prev) => ({ ...prev, active: +e.target.id }));
  };

  useEffect(() => {
    const $pnoneInput: HTMLInputElement | null = document.querySelector(
      'input[name="phone"]'
    );
    let mask: any;
    if ($pnoneInput) {
      mask = IMask($pnoneInput, {
        mask: "+{7} (000) 000-00-00",
      });
    }

    loadProducts();

    return () => {
      mask.destroy();
      setProducts({
        list: [],
        isLoading: false,
        error: null,
        active: 0,
      });
    };
    //eslint-disable-next-line
  }, []);

  const saveNewBidBtn = () => {
    console.log(form);
  };

  return (
    <div className={classes.newBid}>
      <h4>Создание заявки</h4>
      <hr />
      <div className={classes.main}>
        <div className={classes.leftSide}>
          <h5 className={classes.subtitle}>Данные клиента</h5>
          {NEW_BIDS_FORM_CONTROLS.map((formControl, idx) => (
            <div key={idx}>
              {formControl.type === "autocomplete" ? (
                <AutocompleteInput
                  label={formControl.label}
                  name={formControl.name}
                  apiUrl={String(
                    form[formControl.name as keyof INewBidFormState].apiUrl
                  )}
                  value={String(
                    form[formControl.name as keyof INewBidFormState].value
                  )}
                  setValue={handleChange}
                  handleOptionClick={handleAutocompleteChange}
                  isError={
                    form[formControl.name as keyof INewBidFormState].isError
                  }
                  errorMessage={
                    form[formControl.name as keyof INewBidFormState]
                      .errorMessage
                  }
                />
              ) : (
                <BootstrapInput
                  label={formControl.label}
                  name={formControl.name}
                  type={formControl.type}
                  value={String(
                    form[formControl.name as keyof INewBidFormState].value
                  )}
                  setValue={handleChange}
                  isError={
                    form[formControl.name as keyof INewBidFormState].isError
                  }
                  errorMessage={
                    form[formControl.name as keyof INewBidFormState]
                      .errorMessage
                  }
                  selectOptions={
                    form[formControl.name as keyof INewBidFormState]
                      .selectOptions || null
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className={classes.midSide}>
          <h5 className={classes.subtitle}>Продукт</h5>
          {products.isLoading ? (
            <div className={classes.loader}>
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : products.error ? (
            <p className={classes.errorMessage}>{loadingErrorMessage}</p>
          ) : (
            products.list.map((product) => (
              <Form.Check
                key={product.id}
                type="radio"
                label={product.username}
                id={product.id}
                checked={product.id === products.active}
                onChange={handleProductClick}
              />
            ))
          )}
        </div>
        <div className={classes.rightSide}>
          <h5 className={classes.subtitle}>Статус</h5>
          <Form.Check type="radio" label="Не указано" />
        </div>
      </div>

      <div className={classes.saveBtnWrapper}>
        <Button variant="success" onClick={saveNewBidBtn}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default NewBid;
