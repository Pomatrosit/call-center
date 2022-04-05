import { FC, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import CustomPagination from "../CustomPagination/CustomPagitation";
import classes from "./BidList.module.scss";
import { BID_LIST_TABLE_COLUMNS } from "../../constants/bidListTableColumns";
import { useDispatch } from "react-redux";
import { getBids, setPage } from "../../store/bids/actions";
import { useAppSelector } from "../../hooks/useAppSelector";
import BidListIcon from "../Icons/BidListIcon";
import PageTitle from "../PageTitle/PageTitle";

const BidList: FC = () => {
  const dispatch = useDispatch();
  const { page, pageCount, bids, loading, error } = useAppSelector(
    (state) => state.bids
  );

  useEffect(() => {
    dispatch(getBids(page));
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    return () => {
      setActivePage(1);
    };
    //eslint-disable-next-line
  }, []);

  const setActivePage = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={classes.bidList}>
      <PageTitle title="Список заявок" Icon={BidListIcon} />
      {loading ? (
        <div className={classes.loader}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className={classes.errorMessage}>{error}</p>
      ) : bids.length <= 0 ? (
        <p className={classes.emptyMessage}>Заявок не найдено</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                {BID_LIST_TABLE_COLUMNS.map((item) => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => {
                const date = new Date(bid.dateAdd);
                return (
                  <tr key={bid.id}>
                    <td>{bid.id}</td>
                    <td>{bid.surname}</td>
                    <td>{bid.name}</td>
                    <td>{bid.patronymic}</td>
                    <td>Телефон</td>
                    <td>{bid.product}</td>
                    <td>{bid.pbStatus}</td>
                    <td>
                      {date.toLocaleDateString() +
                        " " +
                        date.toLocaleTimeString()}
                    </td>
                    <td>{bid.dateVisitBank}</td>
                    <td>{bid.statusBid}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className={classes.pagination}>
            <CustomPagination
              pageCount={pageCount}
              activePage={page}
              setActivePage={setActivePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BidList;
