import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const format = (str: string) => {
  let arr = str.split("");

  let s = str.length % 3;

  for (let i = 0; i < s; i++) {
    let index = (i + 1) * 3 + i;

    arr.splice(index, 0, "-");
  }

  if (arr.length > 12) {
    arr.splice(11, 0, " ");
  }

  return arr.join("");
};

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const InsuranseInput: FC<IProps> = ({ value, onChange }) => {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(format(value));
  }, [value]);

  const onInsuranseChange = (str: string) => {
    const newStr = str.trimLeft().replace(".", "");

    if (newStr.length > 11) return;
    onChange(newStr);
  };

  return (
    <Form.Control
      placeholder="СНИЛС"
      value={value.length === 11 ? formatted : value}
      onChange={(e) =>
        onInsuranseChange(
          e.target.value.replaceAll(" ", "").replaceAll("-", "")
        )
      }
    />
  );
};

export default InsuranseInput;
