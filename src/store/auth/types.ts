export enum types {
  SET_AUTH = "SET_AUTH",
}

interface setAuthAction {
  type: types.SET_AUTH
  payload: boolean
}

export type AuthActions = setAuthAction
