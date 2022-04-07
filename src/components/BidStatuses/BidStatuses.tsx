import classes from "../BidProducts/BidProducts.module.scss";
import { Form, Spinner } from "react-bootstrap";
import { IStatus } from "../../common-types/status";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FC } from "react";
import axios from "axios";
import {
  emptyStatusMessage,
  loadingErrorMessage,
} from "../../constants/messages";

export interface IStatuses {
  list: IStatus[];
  isLoading: boolean;
  error: string | null;
  active: number;
}

interface IProps {
  statuses: IStatuses;
  setStatuses: Dispatch<SetStateAction<IStatuses>>;
}

const BidStatuses: FC<IProps> = ({ statuses, setStatuses }) => {
  const loadStatuses = async () => {
    setStatuses((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.get("statuses/oper-bid");
      setStatuses((prev) => ({
        ...prev,
        list: response.data,
        active: response.data[0]?.id || 0,
      }));
    } catch (e) {
      setStatuses((prev) => ({ ...prev, error: loadingErrorMessage }));
    } finally {
      setStatuses((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    loadStatuses();
    //eslint-disable-next-line
  }, []);

  const handleStatusClick = (id: number) => {
    setStatuses((prev) => ({ ...prev, active: id }));
  };

  return (
    <div>
      <h5 className={classes.subtitle}>Статус</h5>
      {statuses.isLoading ? (
        <div className={classes.loader}>
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : statuses.error ? (
        <p className={classes.errorMessage}>{loadingErrorMessage}</p>
      ) : !statuses.list.length ? (
        <p className={classes.emptyMessage}>{emptyStatusMessage}</p>
      ) : (
        statuses.list.map((status) => (
          <div key={status.id} className={classes.itemWrapper}>
            <Form.Check
              className={classes.item}
              type="radio"
              label={status.name}
              id={String(status.id)}
              checked={status.id === statuses.active}
              onChange={() => handleStatusClick(status.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BidStatuses;
