export enum types {
  SET_SOCKET = "SET_SOCKET",
}

interface setSocketAction {
  type: types.SET_SOCKET;
  payload: any;
}

export type SocketActions = setSocketAction;
