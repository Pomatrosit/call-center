import { Routes, Route } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/router";
import { useAppSelector } from "./hooks/useAppSelector";
import Layout from "./components/Layout/Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import { SOCKET_URL } from "./constants/common";

const App = () => {
  const { auth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) navigate("/auth");
    else navigate("/");

    // const ioOptions = {
    //   extraHeaders: {
    //     Authorization: "Bearer authorization_token_here",
    //   },
    // };

    // const socketClient = io(`${SOCKET_URL}`, ioOptions);

    // socketClient.on("connect", () => {
    //   console.log("connect");

    //   socketClient.on("connect_error", () => {
    //     console.log("socket connection error!");
    //   });
    // });

    //eslint-disable-next-line
  }, [auth]);

  return (
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
        </Routes>
      )}
    </div>
  );
};

export default App;
