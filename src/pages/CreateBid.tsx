import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import NewBidProducts from "../components/NewBidProducts";
import NewBidForms from "../components/NewBidForms";
import { useAppSelector } from "../hooks/useAppSelector";

const CreateBid: FC = () => {
  const newBid = useAppSelector((state) => state.newBid);

  const handleSaveForms = () => {
    console.log(newBid);
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

export default CreateBid;
