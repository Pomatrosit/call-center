import { Dispatch } from "redux"
import { IUser } from "../../common-types/user"
import { types, UserActions } from "./types"

export const setUser = (user: IUser) => {
  return (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: types.SET_USER,
      payload: user,
    })
  }
}
