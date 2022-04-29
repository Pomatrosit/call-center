import { types, AuthActions } from "./types";

interface IAuthState {
  auth: null | boolean;
}

const initialState: IAuthState = {
  // auth: null,
  auth: true,
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
