import React from 'react';
import { Modal, Button } from 'flowbite-react';
import Barcode from 'react-barcode';
import { useTranslation } from 'react-i18next';

export default function BarcodeModal({ isOpen, toggleModal, barcode }) {
  const { t } = useTranslation(); // Hook de i18next para traducciones

  return (
    <Modal show={isOpen} onClose={toggleModal}>
      <Modal.Header>{t('barcodeModal.generatedBarcode')}</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <Barcode value={barcode} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleModal}>{t('barcodeModal.close')}</Button>
      </Modal.Footer>
    </Modal>
  );
}
