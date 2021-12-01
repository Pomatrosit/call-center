import { FC } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import style from "./NewBidProducts.module.scss";
import {
  BID_CREATE_PRODUCT_LIST,
  BID_CREATE_STATUS_LIST,
} from "../../constants/bidCreate";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setNewBidParams } from "../../store/newBid/actions";

interface IProps {
  handleSave(): void;
}

const NewBidProducts: FC<IProps> = ({ handleSave }) => {
  const newBid = useAppSelector((state) => state.newBid);
  const dispatch = useAppDispatch();

  return (
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

      <Form.Control placeholder="Комментарий" />

      <Button className={style.marginTop} onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
};

export default NewBidProducts;
