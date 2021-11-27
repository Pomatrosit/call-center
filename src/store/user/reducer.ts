import { IUser } from "../../common-types/user"
import { types, UserActions } from "./types"

const initialState: IUser = {
  firstName: "John",
  lastName: "Doe",
}

const reducer = (state: IUser = initialState, action: UserActions): IUser => {
  switch (action.type) {
    case types.SET_USER: {
      return { ...action.payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
