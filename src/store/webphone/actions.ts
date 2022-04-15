import { Dispatch } from "redux";
import { types } from "./types";
import * as JsSIP from "jssip";
import { addNotification } from "../notifications/actions";
import { WEB_PHONE_SOCKET } from "../../constants/common";

export const initWebPhone = () => {
  return (dispatch: Dispatch<any>) => {
    const socket = new JsSIP.WebSocketInterface(WEB_PHONE_SOCKET);
    dispatch(setSocket(socket));

    const configuration = {
      sockets: [socket],
      uri: "sip:u402@fp.sipli.ru",
      password: "2505",
      register: true,
    };

    const coolPhone = new JsSIP.UA(configuration);

    coolPhone.start();

    coolPhone.on("newRTCSession", (e: any) => {
      const session = e.session;
      dispatch(setSession(session));

      // Слушаем каждую новую сессию и выводим звук в тэг audio

      session.connection.addEventListener("addstream", function (e: any) {
        const remoteAudio: HTMLAudioElement | null =
          document.querySelector(".audio");
        if (remoteAudio) {
          remoteAudio.srcObject = e.stream;
          remoteAudio.play();
        }
      });

      //// Слушатели для всех звонков (входящие/исходящие)

      session.on("connecting", function () {
        console.log("call started");
        if (session.direction === "outgoing") {
          dispatch(setOnCall(true));
          dispatch(
            addNotification({
              id: Math.random(),
              variant: "success",
              text: "Вы начинаете звонок!",
              autoHideDuration: 4000,
            })
          );
        } else {
          //// задиспатчить что звонок входящий
        }
      });

      session.on("progress", function () {
        console.log("call is in progress");
      });

      session.on("confirmed", function () {
        console.log("call confirmed");
        dispatch(setOnCall(true));
        dispatch(setConfirmed(true));
      });

      session.on("ended", function () {
        console.log("call ended");
        dispatch(setOnCall(false));
        dispatch(setMuted(false));
        dispatch(setHold(false));
        dispatch(setConfirmed(false));
        dispatch(
          addNotification({
            id: Math.random(),
            variant: "success",
            text: "Звонок завершен! Проставьте результат звонка",
            autoHideDuration: 4000,
          })
        );
      });

      session.on("failed", function (e: any) {
        console.log("call failed");
        dispatch(setOnCall(false));
        dispatch(setMuted(false));
        dispatch(setHold(false));
        dispatch(setConfirmed(false));
        dispatch(
          addNotification({
            id: Math.random(),
            variant: "success",
            text: "Звонок завершен! Проставьте результат звонка",
            autoHideDuration: 4000,
          })
        );
      });
    });

    coolPhone.on("connected", function (e) {
      console.log("CONNECTED TO WEB PHONE", e);
    });

    coolPhone.on("disconnected", function (e) {
      console.log("DISCONNECTED FROM WEB PHONE", e);
    });

    dispatch({
      type: types.INIT_WEB_PHONE,
      payload: coolPhone,
    });
  };
};

export const setOnCall = (bool: boolean) => {
  return {
    type: types.SET_ONCALL,
    payload: bool,
  };
};

export const setSession = (session: any) => {
  return {
    type: types.SET_SESSION,
    payload: session,
  };
};

export const setSocket = (socket: any) => {
  return {
    type: types.SET_SOCKET,
    payload: socket,
  };
};

export const setMuted = (bool: boolean) => {
  return {
    type: types.SET_MUTED,
    payload: bool,
  };
};

export const setHold = (bool: boolean) => {
  return {
    type: types.SET_HOLD,
    payload: bool,
  };
};

export const setConfirmed = (bool: boolean) => {
  return {
    type: types.SET_CONFIRMED,
    payload: bool,
  };
};
