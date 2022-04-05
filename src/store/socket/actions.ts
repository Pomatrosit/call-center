import { Dispatch } from "redux";
import { setAuth } from "../auth/actions";
import { types } from "./types";

interface ISocketEvent {
  event: string;
}

export const setSocket = (socket: any) => {
  return (dispatch: Dispatch<any>, getState: any) => {
    if (socket) {
      socket.on("connect", () => {
        console.log("CONNECTED TO THE SOCKET");

        socket.on("message", (e: ISocketEvent) => {
          console.log(e);
          switch (e.event) {
            case "logout": {
              console.log("logout");
              dispatch(setAuth(false));
              break;
            }

            default:
              break;
          }
        });

        socket.on("connect_error", () => {
          console.log("SOCKET CONNECTION ERROR");
        });

        socket.on("disconnect", () => {
          console.log("DISCONNECTED FROM THE SOCKET");
        });
      });
    }
    if (!socket) {
      const socketClient = getState().socket.socket;
      if (socketClient) socketClient.disconnect();
    }
    dispatch({
      type: types.SET_SOCKET,
      payload: socket,
    });
  };
};