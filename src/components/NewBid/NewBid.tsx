import { FC, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import style from "./NewBid.module.scss";
import PhoneInput from "../Inputs/PhoneInput";
import InsuranseInput from "../Inputs/InsuranseInput";
import {
  BID_CREATE_PRODUCT_LIST,
  BID_CREATE_STATUS_LIST,
} from "../../constants/bidCreate";
import React from "react";

class FormParams {
  phone = ""; // номер телефона
  firstName = ""; // имя
  lastName = ""; // фамилия
  secondName = ""; // отчество
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
        <Col lg={5}>
          <div className={style.main}>
            <h4>Создание заявки</h4>
            <hr />
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
                value={state.lastName}
                onChange={(e) =>
                  setState({ ...state, lastName: e.target.value })
                }
              />
            </div>

            <div className={style.element}>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                placeholder="Имя"
                value={state.firstName}
                onChange={(e) =>
                  setState({ ...state, firstName: e.target.value })
                }
              />
            </div>

            <div className={style.element}>
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                placeholder="Отчество"
                value={state.secondName}
                onChange={(e) =>
                  setState({ ...state, secondName: e.target.value })
                }
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
              <Form.Control
                placeholder="Срок займа от 7 до 180 для МФО"
                value={state.creditTime}
                onChange={(e) =>
                  setState({ ...state, creditTime: e.target.value })
                }
              />
            </div>

            <div className={style.element}>
              <Form.Label>Сумма кредита</Form.Label>
              <Form.Control
                placeholder="Сумма кредита от 1000 до 100,000 для МФО"
                value={state.creditAmount}
                onChange={(e) =>
                  setState({ ...state, creditAmount: e.target.value })
                }
              />
            </div>

            <div className={style.element}>
              <Button onClick={handleSave}>Сохранить</Button>
              <Button variant="danger">Закрыть</Button>
            </div>
          </div>
        </Col>

        <Col md={7}>
          <div className={style.productList}>
            <h4>Оформленные заявки</h4>
            <p>Не указан номер телефона</p>

            <hr />
            <div className={style.grid}>
              <h4>Выберите продукт</h4>
              <h4>Выберите статус</h4>
              <div>
                {BID_CREATE_PRODUCT_LIST.map(({ name, id }) => (
                  <InputGroup size="sm" key={id}>
                    <InputGroup.Radio />
                    <InputGroup.Text>{name}</InputGroup.Text>
                  </InputGroup>
                ))}
              </div>
              <div>
                {BID_CREATE_STATUS_LIST.map(({ name, id }) => (
                  <InputGroup size="sm" key={id}>
                    <InputGroup.Radio />
                    <InputGroup.Text>{name}</InputGroup.Text>
                  </InputGroup>
                ))}
              </div>
            </div>

            <hr />

            <Form.Control placeholder="Коммеентарий" />

            <Button className={style.marginTop}>Сохранить</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewBid;
