import { IModalPopup } from '@interfaces';
import { Modal } from 'react-bootstrap';
import styles from './modalPopup.module.scss';
const ModalPopup = (props: IModalPopup) => {
  const {
    key,
    modalSize,
    modalTitle,
    modalBody,
    backdrop,
    className,
    modalFooter,
    show,
    onHide,
    closeButton = true,
  } = props;
  return (
    <>
      <Modal
        key={key}
        show={show}
        onHide={onHide}
        animation={false}
        centered
        size={modalSize}
        title={''}
        body={modalBody}
        backdrop={backdrop}
        className={className}
      >
        <Modal.Header closeButton={closeButton} className={styles.modalHeader}>
          <Modal.Title dangerouslySetInnerHTML={{ __html: modalTitle }} />
        </Modal.Header>
        <Modal.Body className="pt-0">{modalBody}</Modal.Body>
        <Modal.Footer>{modalFooter}</Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPopup;
