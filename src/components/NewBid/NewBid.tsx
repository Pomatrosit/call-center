import { FC, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import style from "./NewBid.module.scss";
import PhoneInput from "../Inputs/PhoneInput";
import InsuranseInput from "../Inputs/InsuranseInput";

class FormParams {
  phone = ""; // номер телефона
  firstname = ""; // имя
  lastname = ""; // фамилия
  secondname = ""; // отчество
  status = ""; // статус лица
  dateOfBirth = ""; // дата рождения
  region = ""; // регион
  city = ""; // город
  dateOfVisit = ""; // дата посещения банка
  insuranse = ""; // снилс
  creditTime = ""; // срок кредита
  creditAmount = ""; // сумма кредита
}

const NewBid: FC = () => {
  const [state, setState] = useState<FormParams>(new FormParams());

  const handleSave = () => {};

  return (
    <div className={style.newBid}>
      <Row>
        <Col lg="5">
          <div className={style.main}>
            <div className={style.element}>
              <Form.Label>Телефон</Form.Label>
              <PhoneInput
                value={state.phone}
                onChange={(value) => setState({ ...state, phone: value })}
              />
            </div>

            <div className={style.element}>
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                placeholder="Фамилия"
                value={state.lastname}
                onChange={(e) =>
                  setState({ ...state, lastname: e.target.value })
                }
              />
            </div>
            <div className={style.element}>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                placeholder="Имя"
                value={state.firstname}
                onChange={(e) =>
                  setState({ ...state, firstname: e.target.value })
                }
              />
            </div>

            <div className={style.element}>
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                placeholder="Отчество"
                value={state.secondname}
                onChange={(e) => setState({ ...state, secondname: e.target.value })}
              />
            </div>

            <div className={style.element}>
              <Form.Label>Статус лица</Form.Label>
              <Form.Control />
            </div>

            <div className={style.element}>
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control />
            </div>

            <div className={style.element}>
              <Form.Label>Регион</Form.Label>
              <Form.Control />
            </div>

            <div className={style.element}>
              <Form.Label>Город</Form.Label>
              <Form.Control />
            </div>

            <div className={style.element}>
              <Form.Label>Дата визита в банк</Form.Label>
              <Form.Control />
            </div>

            <div className={style.element}>
              <Form.Label>Снилс</Form.Label>
              <InsuranseInput
                value={state.insuranse}
                onChange={(v) => setState({ ...state, insuranse: v })}
              />
            </div>

            <hr />

            <div className={style.element}>
              <Form.Label>Срок займа</Form.Label>
              <Form.Control placeholder="Срок займа от 7 до 180 для МФО" />
            </div>

            <div className={style.element}>
              <Form.Label>Сумма кредита</Form.Label>
              <Form.Control placeholder="Сумма кредита от 1000 до 100,000 для МФО" />
            </div>

            <div className={style.element}>
              <Button onClick={handleSave}>Сохранить</Button>
              <Button variant="danger">Закрыть</Button>
            </div>
          </div>
        </Col>

        <Col>
          <div className={style.productList}>123</div>
        </Col>
      </Row>
    </div>
  );
};

export default NewBid;
