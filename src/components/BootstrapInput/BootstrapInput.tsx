import { FC } from "react";
import classes from "./BootstrapInput.module.scss";
import { Form } from "react-bootstrap";
import { ISelectOption } from "../../common-types/formControl";

interface IProps {
  label: string;
  type: string;
  name: string;
  value: string;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  errorMessage: string | null;
  selectOptions?: ISelectOption[] | null;
}

const BootstrapInput: FC<IProps> = ({
  label,
  type,
  name,
  value,
  setValue,
  isError,
  errorMessage,
  selectOptions,
}) => {
  return (
    <div className={classes.root}>
      {(type === "text" || type === "date" || type === "number") && (
        <>
          <div className={classes.main}>
            <Form.Label className={classes.label}>{label}</Form.Label>
            <Form.Control
              type={type}
              name={name}
              value={value}
              onChange={setValue}
              isInvalid={isError}
            />
          </div>
          {errorMessage && (
            <p className={classes.errorMessage}>{errorMessage}</p>
          )}
        </>
      )}
      {type === "select" && (
        <>
          <div className={classes.main}>
            <Form.Label className={classes.label}>{label}</Form.Label>
            <Form.Control
              name={name}
              as="select"
              onChange={setValue}
              isInvalid={isError}
            >
              <option key={-9999} value={-9999}>
                Выберите из списка
              </option>
              {selectOptions &&
                selectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.title}
                  </option>
                ))}
            </Form.Control>
          </div>
          {errorMessage && (
            <p className={classes.errorMessage}>{errorMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default BootstrapInput;
