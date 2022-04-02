import { FC, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import CustomPagination from "../CustomPagination/CustomPagitation";
import classes from "./BidList.module.scss";
import { BID_LIST_TABLE_COLUMNS } from "../../constants/bidListTableColumns";
import { useDispatch } from "react-redux";
import { getBids, setPage } from "../../store/bids/actions";
import { useAppSelector } from "../../hooks/useAppSelector";

const BidList: FC = () => {
  const dispatch = useDispatch();
  const { page, pageCount, bids, loading, error } = useAppSelector(
    (state) => state.bids
  );

  useEffect(() => {
    dispatch(getBids(page));
    //eslint-disable-next-line
  }, [page]);

  const setActivePage = (page: number) => {
    dispatch(setPage(page));
  };

  if (loading)
    return (
      <div className={classes.loader}>
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <p className={classes.errorMessage}>{error}</p>;

  return (
    <div className={classes.bidList}>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            {BID_LIST_TABLE_COLUMNS.map((item) => (
              <th key={item.id}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{bid.id}</td>
              <td>{bid.im}</td>
              <td>{bid.fm}</td>
              <td>{bid.ot}</td>
              <td>{bid.phone}</td>
              <td>{new Date(bid.date_add).toLocaleString()}</td>
              <td>Дата визита</td>
              <td>{bid.status}</td>
              <td></td>
              <td>{bid.comment || ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className={classes.pagination}>
        <CustomPagination
          pageCount={pageCount}
          activePage={page}
          setActivePage={setActivePage}
        />
      </div> */}
      bids
    </div>
  );
};

export default BidList;
