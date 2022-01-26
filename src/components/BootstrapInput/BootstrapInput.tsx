import { FC } from "react";
import classes from "./BootstrapInput.module.scss";
import { Form } from "react-bootstrap";

interface IProps {
  label: string;
  type: string;
  name: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BootstrapInput: FC<IProps> = ({ label, type, name, value, setValue }) => {
  return (
    <div className={classes.root}>
      <Form.Label className={classes.label}>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} onChange={setValue} />
    </div>
  );
};

export default BootstrapInput;
