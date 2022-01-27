import React, { FC, useEffect, useRef, useState } from "react";
import classes from "./AutocompleteInput.module.scss";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";

const AutocompleteInput: FC = () => {
  const [text, setText] = useState<string>("");
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [isReadyForLoading, setReadyForLoading] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [options, setOptions] = useState<any>([]);

  const optionClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const $option = e.target as Element;
    setText($option.innerHTML);
    setOptionsOpen(false);
  };

  const timeout = useRef<any>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 2) setOptionsOpen(false);
    setText(e.target.value);
    setReadyForLoading(false);
    clearInterval(timeout.current);
    timeout.current = setTimeout(() => {
      setReadyForLoading(true);
    }, 1000);
  };

  const loadOptions = async () => {
    if (isReadyForLoading && text.trim().length >= 2) {
      setOptionsOpen(true);
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users?limit=10"
        );
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
      <Form.Label className={classes.label}>Autocomplete</Form.Label>
      <div className={classes.input}>
        <Form.Control
          type="text"
          name="autocomplete"
          value={text}
          onChange={inputChangeHandler}
        />
        {isOptionsOpen && (
          <>
            <div className={classes.optionList}>
              {isLoading ? (
                <div className={classes.loader}>
                  <Spinner animation="border" variant="secondary" />
                </div>
              ) : error ? (
                <p className={classes.errorMessage}>Ошибка загрузки</p>
              ) : !options.length ? (
                <p className={classes.epmtyOptionsMessage}>Нет совпадений</p>
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
  );
};

export default AutocompleteInput;
