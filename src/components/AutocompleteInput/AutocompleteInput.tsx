import React, { FC, useEffect, useRef, useState } from "react";
import classes from "./AutocompleteInput.module.scss";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  emptyAutocompleteInputMessage,
  errorAutocomleteInputMessage,
} from "../../constants/messages";

interface IProps {
  label: string;
  name: string;
  apiUrl: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionClick: (name: string, value: string) => void;
  isError: boolean;
  errorMessage: string | null;
}

const AutocompleteInput: FC<IProps> = ({
  label,
  name,
  apiUrl,
  value,
  setValue,
  handleOptionClick,
  isError,
  errorMessage,
}) => {
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [isReadyForLoading, setReadyForLoading] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [options, setOptions] = useState<any>([]);

  const optionClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const $option = e.target as Element;
    handleOptionClick(name, $option.innerHTML);
    setOptionsOpen(false);
  };

  const timeout = useRef<any>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 2) setOptionsOpen(false);
    setValue(e);
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
        const response = await axios.get(apiUrl);
        setOptions(response.data);
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
      <div className={classes.main}>
        <Form.Label className={classes.label}>{label}</Form.Label>
        <div className={classes.input}>
          <Form.Control
            type="text"
            name={name}
            value={value}
            onChange={inputChangeHandler}
            isInvalid={isError}
          />
          {isOptionsOpen && (
            <>
              <div className={classes.optionList}>
                {isLoading ? (
                  <div className={classes.loader}>
                    <Spinner animation="border" variant="secondary" />
                  </div>
                ) : error ? (
                  <p className={classes.errorMessage}>
                    {errorAutocomleteInputMessage}
                  </p>
                ) : !options.length ? (
                  <p className={classes.epmtyOptionsMessage}>
                    {emptyAutocompleteInputMessage}
                  </p>
                ) : (
                  options.map((option: any) => (
                    <div
                      key={option.id}
                      className={classes.option}
                      onClick={optionClickHandler}
                    >
                      {option.name}
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
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default AutocompleteInput;
