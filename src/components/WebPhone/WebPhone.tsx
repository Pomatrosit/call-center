import { FC, useState } from "react";
import classes from "./WebPhone.module.scss";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { WEB_PHONE_FIELDS } from "../../constants/webPhone";

const WebPhone: FC = () => {
  const [phone, setPhone] = useState<string>("");

  return (
    <div className={classes.webPhone}>
      <div className={classes.leftSide}>
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          placeholder="+7"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <ButtonGroup aria-label="Basic example" className="mt-3">
          <Button variant="success">Создать заявку</Button>
          <Button variant="danger">В черный список</Button>
        </ButtonGroup>

        <Form.Label className="mt-3">Выберите результат заявки</Form.Label>

        <Form.Select aria-label="bid-result">
          <option value="1">Пенсионер</option>
          <option value="2">Должник</option>
          <option value="3">Данил</option>
        </Form.Select>
      </div>
      <div className={classes.rightSide}>
        <Form.Label>Создать карточку клиента</Form.Label>
        {WEB_PHONE_FIELDS.map((field) => (
          <div key={field.id}>
            <Form.Label>{field.title}</Form.Label>
            <Form.Control placeholder="+7" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebPhone;
