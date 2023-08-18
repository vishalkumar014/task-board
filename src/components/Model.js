import React from 'react';
import { Modal } from 'react-bootstrap';

const CreateBoardModal = ({show,title,onClose,children}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CreateBoardModal;
