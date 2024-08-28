import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmationModal({ isOpen, toggleDrawer }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    // Redirige al usuario a la página de "Thanks" cuando hace clic en comprar
    toggleDrawer();
    setOpenModal(false);
    navigate('/thanks');
  
  };

  return (
    <>
      <Button className="items-center" onClick={() => setOpenModal(true)}>Pay</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Confirm Your Purchase</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to purchase the items in your cart?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePurchase}>Yes, Buy Now</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
