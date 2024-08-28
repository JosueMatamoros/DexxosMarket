import React from 'react';
import { Modal, Button } from 'flowbite-react';
import Barcode from 'react-barcode';

export default function BarcodeModal({ isOpen, toggleModal, barcode }) {
  return (
    <Modal show={isOpen} onClose={toggleModal}>
      <Modal.Header>Generated Barcode</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <Barcode value={barcode} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
