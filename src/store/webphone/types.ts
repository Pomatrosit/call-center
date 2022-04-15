export enum types {
  SET_SOCKET = "SET_SOCKET",
  INIT_WEB_PHONE = "INIT_WEB_PHONE",
  SET_SESSION = "SET_SESSION",
  SET_ONCALL = "SET_ONCALL",
  SET_MUTED = "SET_MUTED",
  SET_HOLD = "SET_HOLD",
  SET_CONFIRMED = "SET_CONFIRMED",
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

interface setSocket {
  type: types.SET_SOCKET;
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

export type WebPhoneActions =
  | initWebPhone
  | setOnCall
  | setSession
  | setSocket
  | setMuted
  | setHold
  | setConfirmed;
