import { FC } from "react";
import BidList from "../components/BidList/BidList";
import withAuth from "../hoc/withAuth";

const Index: FC = () => {
  return <BidList />;
};

export default withAuth(Index);
