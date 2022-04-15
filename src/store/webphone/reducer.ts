import { types, WebPhoneActions } from "./types";

interface IWebPhone {
  socket: any;
  coolPhone: any;
  session: any;
  isOnCall: boolean;
  isMute: boolean;
  isHold: boolean;
  isConfirmed: boolean;
}

const initialState: IWebPhone = {
  socket: null,
  coolPhone: null,
  session: null,
  isOnCall: false,
  isMute: false,
  isHold: false,
  isConfirmed: false,
};

const reducer = (
  state: IWebPhone = initialState,
  action: WebPhoneActions
): IWebPhone => {
  switch (action.type) {
    case types.INIT_WEB_PHONE: {
      return { ...state, coolPhone: action.payload };
    }

    case types.SET_ONCALL: {
      return { ...state, isOnCall: action.payload };
    }

    case types.SET_SESSION: {
      return { ...state, session: action.payload };
    }

    case types.SET_SOCKET: {
      return { ...state, socket: action.payload };
    }

    case types.SET_MUTED: {
      return { ...state, isMute: action.payload };
    }

    case types.SET_HOLD: {
      return { ...state, isHold: action.payload };
    }

    case types.SET_CONFIRMED: {
      return { ...state, isConfirmed: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
