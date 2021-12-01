import { FC } from 'react'

export enum types {
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
}
  
interface openModal {
    type: types.OPEN_MODAL
    payload: {
        title: string
        component: FC | null
    }
}

interface closeModal {
    type: types.CLOSE_MODAL
}
  
export type ModalActions = openModal | closeModal