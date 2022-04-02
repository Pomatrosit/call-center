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

    const verifyToken = async () => {};

    useEffect(() => {
      verifyToken();
      //eslint-disable-next-line
    }, []);

    if (verified) {
      return <WrappedComponent />;
    }

    return null;
  };
};

export default withAuth;
