import { types, ModalActions } from "./types"
import { FC } from 'react'

interface IModalState {
  show: boolean,
  title: string,
  Component: FC | null
}

const initialState: IModalState = {
  show: false,
  title: 'Тайтл модалки',
  Component: null
}

const reducer = (
  state: IModalState = initialState,
  action: ModalActions
): IModalState => {
  switch (action.type) {
    case types.OPEN_MODAL: {
      return { ...state, show: true, title: action.payload.title, Component: action.payload.component }
    }

    case types.CLOSE_MODAL: {
        return { ...state, show: false }
    }

    default: {
      return state
    }
  }
}

export default reducer