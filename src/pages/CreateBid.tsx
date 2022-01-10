import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import NewBidProducts from "../components/NewBidProducts";
import NewBidForms from "../components/NewBidForms";
import { useAxios } from "../hooks/useAxios";
import { useAppSelector } from "../hooks/useAppSelector";
import withAuth from "../hoc/withAuth";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notifications/actions";

interface Result {
  ok: boolean;
  err: string;
}

const CreateBid: FC = () => {
  const newBid = useAppSelector((state) => state.newBid);
  const axios = useAxios();
  const dispatch = useDispatch();

  const handleSaveForms = async () => {
    const { data } = await axios<Result>("post", "createBid", newBid);
    if (data.ok) {
      return dispatch(
        addNotification({
          id: Date.now(),
          autoHideDuration: 10000,
          variant: "danger",
          text: "Заявка была успешно добавлена",
        })
      );
    } else {
      return dispatch(
        addNotification({
          id: Date.now(),
          autoHideDuration: 10000,
          variant: "danger",
          text: data.err,
        })
      );
    }
  };
  const handleSaveProduct = () => {};

  return (
    <div style={{ marginBottom: "4vh" }}>
      <Row>
        <Col lg={5}>
          <NewBidForms handleSave={handleSaveForms} />
        </Col>

        <Col md={7}>
          <NewBidProducts handleSave={handleSaveProduct} />
        </Col>
      </Row>
    </div>
  );
};

export default withAuth(CreateBid);
