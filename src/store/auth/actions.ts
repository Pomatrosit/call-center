import { Dispatch } from "redux"
import { types, AuthActions } from "./types"

export const setAuth = (bool: boolean) => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch({
      type: types.SET_AUTH,
      payload: bool,
    })
  }
}
