import { types, SocketActions } from "./types";

export interface ISocketState {
  socket: any;
}

const initialState: ISocketState = {
  socket: null,
};

const reducer = (
  state: ISocketState = initialState,
  action: SocketActions
): ISocketState => {
  switch (action.type) {
    case types.SET_SOCKET: {
      const socket = action.payload;
      return { ...state, socket };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
