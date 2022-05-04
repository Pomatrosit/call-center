import { Dispatch } from "redux";
import { types } from "./types";
import * as JsSIP from "jssip";
import { addNotification } from "../notifications/actions";
import { SESSION_STORAGE, WEB_PHONE_SOCKET } from "../../constants/common";
import CryptoJS from "crypto-js";
import { IWebPhoneTransferValues } from "../../components/WebPhone/WebPhone";
import axios from "axios";
import { changeWebPhoneStatus } from "../../helpers/webPhone";

const getAudio = function (e: any) {
  const remoteAudio: HTMLAudioElement | null = document.querySelector(".audio");
  if (remoteAudio) {
    remoteAudio.srcObject = e.stream;
    remoteAudio.play();
  }
};

export const initWebPhone = () => {
  return (dispatch: Dispatch<any>) => {
    const socket = new JsSIP.WebSocketInterface(WEB_PHONE_SOCKET);
    dispatch(setWebPhoneSocket(socket));

    const secretKey = "YXNkaGoxajMycmJqc2RjODIzYmNkbjI4NzNoZDI3MjEyamQx";
    const journalId = sessionStorage.getItem(SESSION_STORAGE.journalId);
    const bytes = CryptoJS.AES.decrypt(
      String(sessionStorage.getItem(SESSION_STORAGE.hashphone)),
      secretKey
    );
    const hashPhone = bytes.toString(CryptoJS.enc.Utf8).trim();

    const configuration = {
      sockets: [socket],
      uri: `sip:${journalId}@fp.sipli.ru`,
      password: hashPhone,
      register: true,
    };

    const coolPhone = new JsSIP.UA(configuration);

    coolPhone.start();

    coolPhone.on("newRTCSession", (e: any) => {
      const session = e.session;
      dispatch(setSession(session));
      const incomingAudio: HTMLAudioElement | null =
        document.querySelector(".incoming");

      console.log(session);

      /// Стрим звука при исходящем
      if (session.connection)
        session.connection.addEventListener("addstream", getAudio);

      session.on("connecting", function (e: any) {
        console.log(e);
        console.log("call connecting");
        if (session.direction === "outgoing") {
          dispatch(setOnCall(true));
          changeWebPhoneStatus("call");
          dispatch(
            addNotification({
              id: Math.random(),
              variant: "success",
              text: "Вы начинаете звонок!",
              autoHideDuration: 4000,
            })
          );
        }
      });

      session.on("progress", function (e: any) {
        //// Стрим звука при входящем
        if (session.direction === "incoming") {
          incomingAudio?.play();
          dispatch(setCurrentPhone(session.remote_identity.display_name));
          localStorage.setItem(
            "currentPhone",
            session.remote_identity.display_name
          );
          dispatch(setIncomingRing(true));
          dispatch(
            addNotification({
              id: Math.random(),
              variant: "success",
              text: "Вам поступает входящий звонок!",
              autoHideDuration: 3000,
            })
          );
        }
        console.log("call is in progress");
      });

      session.on("peerconnection", function (e: any) {
        console.log("peerconnection");
      });

      session.on("confirmed", function () {
        console.log("call confirmed");
        dispatch(setIncomingRing(false));
        dispatch(setOnCall(true));
        dispatch(setConfirmed(true));
        incomingAudio?.pause();
        changeWebPhoneStatus("call");
      });

      session.on("ended", function () {
        console.log("call ended");
        changeWebPhoneStatus("state");
        dispatch(setOnCall(false));
        dispatch(setMuted(false));
        dispatch(setHold(false));
        dispatch(setConfirmed(false));
        incomingAudio?.pause();
        dispatch(setIncomingRing(false));
        dispatch(
          addNotification({
            id: Math.random(),
            variant: "success",
            text: "Звонок завершен! Проставьте результат звонка",
            autoHideDuration: 4000,
          })
        );
      });

      session.on("failed", function () {
        console.log("call failed");
        changeWebPhoneStatus("wait");
        dispatch(setOnCall(false));
        dispatch(setMuted(false));
        dispatch(setHold(false));
        dispatch(setConfirmed(false));
        incomingAudio?.pause();
        dispatch(setIncomingRing(false));
        dispatch(
          addNotification({
            id: Math.random(),
            variant: "success",
            text: "Звонок завершен!",
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

export const setWebPhoneSocket = (socket: any) => {
  return {
    type: types.SET_WEB_PHONE_SOCKET,
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

export const setIncomingRing = (bool: boolean) => {
  return {
    type: types.SET_INCOMING_RING,
    payload: bool,
  };
};

export const setWebPhoneTransferValues = (
  payload: IWebPhoneTransferValues | null
) => {
  return {
    type: types.SET_WEB_PHONE_TRANSFER_VALUES,
    payload,
  };
};

export const setCurrentPhone = (phone: string) => {
  return {
    type: types.SET_CURRENT_PHONE,
    payload: phone,
  };
};

export const setMinifiedWebPhone = (bool: boolean) => {
  return {
    type: types.SET_MINIFIED_WEB_PHONE,
    payload: bool,
  };
};

export const loadPhoneResults = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.get("/phone/statuses");
      dispatch(setPhoneResults(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPhoneResults = (res: any) => {
  return {
    type: types.SET_PHONE_RESULTS,
    payload: res,
  };
};
