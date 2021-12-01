import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/useAppSelector'
import { closeModal } from '../../store/modal/actions'

const ModalWindow = () => {

    const { show, title, Component } = useAppSelector(state => state.modal)

    const dispatch = useDispatch()

    if (show) return (
      <div>
        <Modal show={show} onHide={() => dispatch(closeModal())}>
          <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>{ Component && <Component /> }</Modal.Body>
        </Modal>
      </div>
    )

    return null
}

export default ModalWindow