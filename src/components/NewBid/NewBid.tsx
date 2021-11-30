import { FC } from "react";
import style from "./NewBid.module.scss";
import { Row, Col } from "react-bootstrap";
import NewBidProducts from "../NewBidProducts";
import NewBidForms from "../NewBidForms";

const NewBid: FC = () => {
  const handleSaveForms = () => {};
  const handleSaveProduct = () => {};

  return (
    <div className={style.newBid}>
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

export default NewBid;
