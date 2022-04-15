import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { closeModal } from "../../store/modal/actions";
import classes from "./ModalWindow.module.scss";

const ModalWindow = () => {
  const { show, title, Component } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  if (show)
    return (
      <div>
        <Modal size="lg" show={show} onHide={close}>
          <Modal.Header closeButton>
            <div className={classes.bg}>
              <img
                src="/logotype.svg"
                alt="background"
                className={classes.backgroundImg}
              />
            </div>
            <div className={classes.modalHeaderContent}>
              <Modal.Title>{title}</Modal.Title>
              <div className={classes.icons}>
                <div className={classes.rollDown}></div>
                <img
                  onClick={close}
                  className={classes.closeIcon}
                  src="/icons/closeIcon.svg"
                  alt="close-modal"
                />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>{Component && <Component />}</Modal.Body>
        </Modal>
      </div>
    );

  return null;
};

export default ModalWindow;
