import { FC } from "react";
import { Form, Button } from "react-bootstrap";
import PhoneInput from "../Inputs/PhoneInput";
import InsuranseInput from "../Inputs/InsuranseInput";
import { setNewBidParams } from "../../store/newBid/actions";
import style from "./NewBidForms.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";

interface IProps {
  handleSave(): void;
}

const NewBidForms: FC<IProps> = ({ handleSave }) => {
  const dispatch = useDispatch();
  const newBid = useAppSelector((state) => state.newBid);

  return (
    <div className={style.main}>
      <h4>Создание заявки</h4>
      <hr />
      <div className={style.element}>
        <Form.Label>Телефон</Form.Label>
        <PhoneInput
          value={newBid.phone}
          onChange={(value) => dispatch(setNewBidParams({ phone: value }))}
        />
      </div>

      <div className={style.element}>
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          placeholder="Фамилия"
          value={newBid.lastName}
          onChange={(e) =>
            dispatch(setNewBidParams({ lastName: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Имя</Form.Label>
        <Form.Control
          placeholder="Имя"
          value={newBid.firstName}
          onChange={(e) =>
            dispatch(setNewBidParams({ firstName: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          placeholder="Отчество"
          value={newBid.secondName}
          onChange={(e) =>
            dispatch(setNewBidParams({ secondName: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Статус лица</Form.Label>
        <Form.Select
          value={newBid.status}
          onChange={(e) =>
            dispatch(setNewBidParams({ status: +e.target.value }))
          }
        >
          <option value={0}>Не выбрано</option>
          <option value={1}>Индивидуальный предпрениматель</option>
          <option value={2}>Физическое лицо</option>
          <option value={3}>Юридическое лицо</option>
        </Form.Select>
      </div>

      <div className={style.element}>
        <Form.Label>Дата рождения</Form.Label>
        <Form.Control
          type="date"
          value={newBid.dateOfBirth}
          onChange={(e) =>
            dispatch(setNewBidParams({ dateOfBirth: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Регион</Form.Label>
        <Form.Control
          value={newBid.region}
          onChange={(e) =>
            dispatch(setNewBidParams({ region: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Город</Form.Label>
        <Form.Control
          value={newBid.city}
          onChange={(e) => dispatch(setNewBidParams({ city: e.target.value }))}
        />
      </div>

      <div className={style.element}>
        <Form.Label>Дата визита в банк</Form.Label>
        <Form.Control
          type="date"
          value={newBid.dateOfVisit}
          onChange={(e) =>
            dispatch(setNewBidParams({ dateOfVisit: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Снилс</Form.Label>
        <InsuranseInput
          value={newBid.insuranse}
          onChange={(v) => dispatch(setNewBidParams({ insuranse: v }))}
        />
      </div>

      <hr />

      <div className={style.element}>
        <Form.Label>Срок займа</Form.Label>
        <Form.Control
          placeholder="Срок займа от 7 до 180 для МФО"
          value={newBid.creditTime}
          onChange={(e) =>
            dispatch(setNewBidParams({ creditTime: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Form.Label>Сумма кредита</Form.Label>
        <Form.Control
          placeholder="Сумма кредита от 1000 до 100,000 для МФО"
          value={newBid.creditAmount}
          onChange={(e) =>
            dispatch(setNewBidParams({ creditAmount: e.target.value }))
          }
        />
      </div>

      <div className={style.element}>
        <Button onClick={handleSave}>Сохранить</Button>
        <Button variant="danger">Закрыть</Button>
      </div>
    </div>
  );
};

export default NewBidForms;
