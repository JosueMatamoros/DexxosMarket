import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";

export default function ConfirmationModal() {
    const [openModal, setOpenModal] = useState(false);

    const handlePurchase = () => {
        // Aquí puedes implementar la lógica para proceder con la compra
        console.log("Compra confirmada. Procediendo con la lógica de compra...");
        setOpenModal(false);  // Cierra el modal después de confirmar la compra
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
