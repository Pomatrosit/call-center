import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: FC<IProps> = ({ value, onChange }) => {
  const [phone, setPhone] = useState(value);

  const onPhoneChange = (str: string) => {
    const value = str.trim().replace(".", "");

    if (value.length > 12) return;
    if (value.length <= 2) return setPhone("+7");
    if (Number.isNaN(+value)) return;
    if (value) return setPhone(value);
  };

  useEffect(() => {
    onChange(phone);
  }, [onChange, phone]);

  return (
    <Form.Control
      placeholder="Номер телефона"
      value={phone}
      onFocus={(e) => e.target.value === "" && setPhone("+7")}
      onChange={(e) => onPhoneChange(e.target.value)}
    />
  );
};

export default PhoneInput;
