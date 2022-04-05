import { IUser } from "../../common-types/user";
import { types, UserActions } from "./types";

const firstName = sessionStorage.getItem("firstName");
const lastName = sessionStorage.getItem("lastName");

const initialState: IUser = {
  firstName: firstName ? firstName : "User",
  lastName: lastName ? lastName : "Unknown",
};

const reducer = (state: IUser = initialState, action: UserActions): IUser => {
  switch (action.type) {
    case types.SET_USER: {
      return { ...action.payload };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
