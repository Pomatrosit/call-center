import { IWebPhoneTransferValues } from "../../components/WebPhone/WebPhone";

export enum types {
  SET_WEB_PHONE_SOCKET = "SET_WEB_PHONE_SOCKET",
  INIT_WEB_PHONE = "INIT_WEB_PHONE",
  SET_SESSION = "SET_SESSION",
  SET_ONCALL = "SET_ONCALL",
  SET_MUTED = "SET_MUTED",
  SET_HOLD = "SET_HOLD",
  SET_CONFIRMED = "SET_CONFIRMED",
  SET_INCOMING_RING = "SET_INCOMING_RING",
  SET_WEB_PHONE_TRANSFER_VALUES = "SET_WEB_PHONE_TRANSFER_VALUES",
  SET_CURRENT_PHONE = "SET_CURRENT_PHONE",
  SET_MINIFIED_WEB_PHONE = "SET_MINIFIED_WEB_PHONE",
  SET_PHONE_RESULTS = "SET_PHONE_RESULTS",
}

interface initWebPhone {
  type: types.INIT_WEB_PHONE;
  payload: any;
}

interface setOnCall {
  type: types.SET_ONCALL;
  payload: boolean;
}

interface setSession {
  type: types.SET_SESSION;
  payload: any;
}

interface setWebPhoneSocket {
  type: types.SET_WEB_PHONE_SOCKET;
  payload: any;
}

interface setMuted {
  type: types.SET_MUTED;
  payload: boolean;
}

interface setHold {
  type: types.SET_HOLD;
  payload: boolean;
}

interface setConfirmed {
  type: types.SET_CONFIRMED;
  payload: boolean;
}

interface setIncomingRing {
  type: types.SET_INCOMING_RING;
  payload: boolean;
}

interface setWebPhoneTransferValues {
  type: types.SET_WEB_PHONE_TRANSFER_VALUES;
  payload: IWebPhoneTransferValues | null;
}

interface setCurrentPhone {
  type: types.SET_CURRENT_PHONE;
  payload: string;
}

interface setMinifiedWebPhone {
  type: types.SET_MINIFIED_WEB_PHONE;
  payload: boolean;
}

interface setPhoneResults {
  type: types.SET_PHONE_RESULTS;
  payload: any;
}

export type WebPhoneActions =
  | initWebPhone
  | setOnCall
  | setSession
  | setWebPhoneSocket
  | setMuted
  | setHold
  | setConfirmed
  | setIncomingRing
  | setWebPhoneTransferValues
  | setCurrentPhone
  | setMinifiedWebPhone
  | setPhoneResults;
