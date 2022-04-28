import axios from "axios";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { API_URL } from "../../constants/common";
import CustomPagination from "../CustomPagination/CustomPagitation";
import StatisticsIcon from "../Icons/StatisticsIcon";
import PageTitle from "../PageTitle/PageTitle";
import classes from "./CallHistory.module.scss";

const CallHistory = () => {
  const [audios, setAudios] = useState([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const loadHistory = async (page: number) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/calls/user_list?page=${page}`
      );
      console.log(data);
      setAudios(data.calls);
      setPageCount(data.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    loadHistory(activePage);

    return () => {
      setActivePage(1);
    };
  }, [activePage]);

  return (
    <div className={classes.root}>
      <PageTitle title="История звонков" Icon={StatisticsIcon} />
      {audios.map((call: any) => (
        <div key={call.id}>
          <ReactAudioPlayer
            src={`https://lk.fin-crm.com/cdr/${call.record}`}
            controls
          />
        </div>
      ))}

      <CustomPagination
        pageCount={pageCount}
        activePage={activePage}
        setActivePage={changePage}
      />
    </div>
  );
};

export default CallHistory;
