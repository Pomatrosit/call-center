import { Dispatch } from "redux"
import { types, ModalActions } from "./types"
import { FC } from 'react'

export const openModal = (title: string, component: FC | null ) => {
  return (dispatch: Dispatch<ModalActions>) => {
    dispatch({
      type: types.OPEN_MODAL,
      payload: {
          title,
          component
      }
    })
  }
}

export const closeModal = () => {
    return (dispatch: Dispatch<ModalActions>) => {
      dispatch({
        type: types.CLOSE_MODAL
      })
    }
}