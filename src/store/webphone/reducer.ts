import { IWebPhoneTransferValues } from "../../components/WebPhone/WebPhone";
import { types, WebPhoneActions } from "./types";

interface IWebPhone {
  socket: any;
  coolPhone: any;
  session: any;
  isOnCall: boolean;
  isMute: boolean;
  isHold: boolean;
  isConfirmed: boolean;
  isIncomingRing: boolean;
  transferValues: IWebPhoneTransferValues | null;
  currentPhone: string;
  isMinified: boolean;
}

const initialState: IWebPhone = {
  socket: null,
  coolPhone: null,
  session: null,
  isOnCall: false,
  isMute: false,
  isHold: false,
  isConfirmed: false,
  isIncomingRing: false,
  transferValues: null,
  currentPhone: "",
  isMinified: true,
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

    case types.SET_WEB_PHONE_SOCKET: {
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

    case types.SET_INCOMING_RING: {
      return { ...state, isIncomingRing: action.payload };
    }

    case types.SET_WEB_PHONE_TRANSFER_VALUES: {
      return {
        ...state,
        transferValues: action.payload,
      };
    }

    case types.SET_CURRENT_PHONE: {
      return { ...state, currentPhone: action.payload };
    }

    case types.SET_MINIFIED_WEB_PHONE: {
      return { ...state, isMinified: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
