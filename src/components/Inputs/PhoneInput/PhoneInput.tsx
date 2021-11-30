import { FC } from "react";
import { Form } from "react-bootstrap";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: FC<IProps> = ({ value, onChange }) => {
  const onPhoneChange = (str: string) => {
    const value = str.trim().replace(".", "");

    if (value.length > 12) return;
    if (value.length <= 2) return onChange("+7");
    if (Number.isNaN(+value)) return;
    if (value) return onChange(value);
  };

  return (
    <Form.Control
      placeholder="Номер телефона"
      value={value}
      onFocus={(e) => e.target.value === "" && onChange("+7")}
      onChange={(e) => onPhoneChange(e.target.value)}
    />
  );
};

export default PhoneInput;
