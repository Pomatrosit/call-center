import { IUser } from "../../common-types/user"

export enum types {
  SET_USER = "SET_USER",
}

interface setUserAction {
  type: types.SET_USER
  payload: IUser
}

export type UserActions = setUserAction
