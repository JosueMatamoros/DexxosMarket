import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ConfirmationModal({ isOpen, toggleDrawer }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook de i18next para traducciones

  const handlePurchase = () => {
    // Redirige al usuario a la página de "Thanks" cuando hace clic en comprar
    toggleDrawer();
    setOpenModal(false);
    navigate('/thanks');
  };

  return (
    <>
      <Button className="items-center" onClick={() => setOpenModal(true)}>
        {t('confirmationModal.pay')}
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{t('confirmationModal.confirmPurchase')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {t('confirmationModal.confirmationMessage')}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePurchase}>{t('confirmationModal.yesBuyNow')}</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            {t('confirmationModal.noCancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
