import { useEffect, useState, FC } from "react";
import axios from "axios";
import { API_URL } from "../constants/common";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth/actions";
import { addNotification } from "../store/notifications/actions";

const withAuth = (WrappedComponent: FC) => {
  return () => {
    const [verified, setVerified] = useState(false);
    const dispatch = useDispatch();

    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.get<{ access: boolean }>(
          `${API_URL}/verifyToken`,
          {
            headers: {
              authorization: String(localStorage.getItem("token")),
            },
          }
        );
        if (!token) {
          setVerified(false);
          dispatch(setAuth(false));
        } else {
          if (data.access) {
            setVerified(true);
            dispatch(setAuth(true));
          } else {
            localStorage.removeItem("token");
            setVerified(false);
            dispatch(setAuth(false));
          }
        }
      } catch (error) {
        dispatch(
          addNotification({
            id: Date.now(),
            autoHideDuration: null,
            variant: "danger",
            text: "Ошибка загрузки!",
          })
        );
      }
    };

    useEffect(() => {
      verifyToken();
      //eslint-disable-next-line
    }, []);

    if (verified) {
      return <WrappedComponent />;
    } else {
      return null;
    }
  };
};

export default withAuth;
