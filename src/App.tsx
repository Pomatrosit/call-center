import { Routes, Route, Navigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/router";
import { useAppSelector } from "./hooks/useAppSelector";
import Layout from "./components/Layout/Layout";
import { useEffect, useState } from "react";
import { SESSION_STORAGE, TOKENS } from "./constants/common";
import { io } from "socket.io-client";
import { SOCKET_URL } from "./constants/common";
import { useDispatch } from "react-redux";
import { setSocket } from "./store/socket/actions";
import { setAuth } from "./store/auth/actions";
import { checkAuth } from "./helpers/auth";
import { axiosConfig, axiosInterceptor } from "./helpers/axios";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { initWebPhone } from "./store/webphone/actions";
import { changeWebPhoneStatus, registerWebPhone } from "./helpers/webPhone";

const App = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const { socket: webPhoneSocket, coolPhone } = useAppSelector(
    (state) => state.webPhone
  );

  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

  const hideLoadingScreen = () => {
    const screen: HTMLDivElement | null =
      document.querySelector(".loading-screen");
    if (screen) screen.style.opacity = "0";
    setTimeout(() => {
      setLoadingScreen(false);
    }, 300);
  };

  const dispatch = useDispatch();

  const login = () => {
    dispatch(setAuth(true));
  };

  const logout = () => {
    dispatch(setAuth(false));
  };

  useEffect(() => {
    axiosConfig();
    axiosInterceptor(login, logout);
    // checkAuth(login, logout);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth) {
      const ioOptions = {
        extraHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem(TOKENS.accessToken)}`,
        },
        secure: true,
      };
      const socketClient = io(`${SOCKET_URL}`, ioOptions);
      dispatch(setSocket(socketClient));
      dispatch(initWebPhone());
      hideLoadingScreen();
      registerWebPhone();
    } else if (auth === false) {
      sessionStorage.removeItem(TOKENS.accessToken);
      sessionStorage.removeItem(TOKENS.refreshToken);
      sessionStorage.removeItem(SESSION_STORAGE.journalId);
      sessionStorage.removeItem(SESSION_STORAGE.hashphone);
      dispatch(setSocket(null));
      if (coolPhone) {
        coolPhone.unregister();
        coolPhone.stop();
      }
      if (webPhoneSocket) webPhoneSocket.disconnect();
      hideLoadingScreen();
    }
    //eslint-disable-next-line
  }, [auth]);

  if (loadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <>
      {auth !== null ? (
        <div className="App">
          {auth ? (
            <Layout>
              <Routes>
                {PRIVATE_ROUTES.map((item) => (
                  <Route
                    key={item.id}
                    path={item.path}
                    element={<item.Component />}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              {PUBLIC_ROUTES.map((item) => (
                <Route
                  key={item.id}
                  path={item.path}
                  element={<item.Component />}
                />
              ))}
              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          )}
        </div>
      ) : null}
    </>
  );
};

export default App;
