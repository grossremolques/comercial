import { Modal, Button } from "react-bootstrap";
import { useModal } from "../context/ModalContext";
export function ModalComponent({
  title,
  body,
  nameButton,
  handleOnClick,
  modalId,
  showButtonsClose,
  variantBtn
}) {
  const { handleModalClose, activeModal } = useModal();
  return (
    <Modal
      show={activeModal === modalId}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
      id={modalId}

    >
      <Modal.Header closeButton={showButtonsClose} >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">{body}</Modal.Body>
      <Modal.Footer>
        {showButtonsClose && (
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        )}
        {nameButton && (
          <Button variant={variantBtn} onClick={handleOnClick}>
            {nameButton}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
