import React, {
  FC,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import classes from "./AutocompleteInput.module.scss";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  emptyAutocompleteInputMessage,
  loadingErrorMessage,
} from "../../constants/messages";

interface IProps {
  name: string;
  apiUrl: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  isValid: boolean;
  formik: any;
  disabled?: boolean;
  setClicked?: Dispatch<SetStateAction<boolean>>;
}

const AutocompleteInput: FC<IProps> = ({
  name,
  apiUrl,
  value,
  onChange,
  isInvalid,
  isValid,
  formik,
  disabled,
  setClicked,
}) => {
  const token = "4deffe40706c5ed31b307087627fd4610856abd0";
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [isReadyForLoading, setReadyForLoading] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [options, setOptions] = useState<any>([]);

  const optionClickHandler = (value: string) => {
    if (setClicked) {
      setClicked(true);
      if (name === "region") {
        formik.setFieldValue("city", "", true);
        formik.setFieldTouched("city", false);
      }
    }
    formik.setFieldValue(name, value, true);
    setOptionsOpen(false);
  };

  const timeout = useRef<any>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 2) setOptionsOpen(false);
    if (setClicked) setClicked(false);
    onChange(e);
    setReadyForLoading(false);
    clearInterval(timeout.current);
    timeout.current = setTimeout(() => {
      setReadyForLoading(true);
    }, 1000);
  };

  const loadOptions = async () => {
    if (isReadyForLoading && value.trim().length >= 2) {
      setOptionsOpen(true);
      setLoading(true);
      setError(false);
      try {
        const response = await axios.post(
          apiUrl,
          { query: value },
          {
            headers: {
              Authorization: "Token " + token,
            },
          }
        );

        console.log(response.data);
        setOptions(response.data.suggestions);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadOptions();

    //eslint-disable-next-line
  }, [isReadyForLoading]);

  return (
    <div className={classes.root}>
      <div className={classes.input}>
        <Form.Control
          type="text"
          name={name}
          onChange={inputChangeHandler}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          isInvalid={isInvalid}
          isValid={isValid}
          disabled={disabled}
        />
        {isOptionsOpen && (
          <>
            <div className={classes.optionList}>
              {isLoading ? (
                <div className={classes.loader}>
                  <Spinner animation="border" variant="secondary" />
                </div>
              ) : error ? (
                <p className={classes.errorMessage}>{loadingErrorMessage}</p>
              ) : !options.length ? (
                <p className={classes.epmtyOptionsMessage}>
                  {emptyAutocompleteInputMessage}
                </p>
              ) : (
                options.map((option: any, idx: number) => (
                  <div
                    key={idx}
                    className={classes.option}
                    onClick={() => optionClickHandler(option.value)}
                  >
                    {option.value}
                  </div>
                ))
              )}
            </div>
            <div
              className={classes.optionsOverlay}
              onClick={() => setOptionsOpen(false)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;
