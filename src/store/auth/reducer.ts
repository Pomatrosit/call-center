import { types, AuthActions } from "./types";

interface IAuthState {
  auth: boolean;
}

const initialState: IAuthState = {
  // to-do change back after be implementation
  auth: true, //!!localStorage.getItem("token"),
};

const reducer = (
  state: IAuthState = initialState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case types.SET_AUTH: {
      return { ...state, auth: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
