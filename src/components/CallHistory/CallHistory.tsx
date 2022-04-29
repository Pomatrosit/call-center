import axios from "axios";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Spinner } from "react-bootstrap";
import { API_URL } from "../../constants/common";
import CustomPagination from "../CustomPagination/CustomPagitation";
import StatisticsIcon from "../Icons/StatisticsIcon";
import PageTitle from "../PageTitle/PageTitle";
import classes from "./CallHistory.module.scss";

const CallHistory = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [activePage, setActivePage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const loadHistory = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `${API_URL}/calls/user_list?page=${page}`
      );
      console.log(data);
      setAudios(data.calls);
      setPageCount(data.pageCount);
    } catch (error) {
      console.log(error);
      setError("Ошибка загрузки!");
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    loadHistory(activePage);
  }, [activePage]);

  useEffect(() => {
    return () => {
      setActivePage(1);
    };
  }, []);

  return (
    <div className={classes.root}>
      <PageTitle title="История звонков" Icon={StatisticsIcon} />
      {loading ? (
        <div className={classes.spinner}>
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : error ? (
        <p className={classes.errorMessage}>{error}</p>
      ) : audios.length === 0 ? (
        <p className={classes.emptyMessage}>За последнее время нет звонков!</p>
      ) : (
        <>
          {audios.map((call: any) => {
            const callDate = new Date(call.callDate);
            const date = callDate.toLocaleDateString();
            const time = callDate.toLocaleTimeString();
            return (
              <div className={classes.callRow} key={call.id}>
                <p>
                  {date} {time}
                </p>
                <p>{call.numberA}</p>
                <p>{call.numberB}</p>
                <p>{call.billsec}</p>
                <ReactAudioPlayer
                  src={`https://lk.fin-crm.com/cdr/${call.record}`}
                  controls
                />
              </div>
            );
          })}
          <div className={classes.pagination}>
            <CustomPagination
              pageCount={pageCount}
              activePage={activePage}
              setActivePage={changePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CallHistory;
