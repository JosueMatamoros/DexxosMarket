import React, { useState } from 'react';
import { Card, Button, Dropdown } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from 'flowbite-react';
import BarcodeModal from './BarcodeModal';

export default function OrderCard({ order }) {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDarkMode = mode === 'dark';

  const [selectedOption, setSelectedOption] = useState('Dexxos Market');

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className={`flex justify-between items-start p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <div>
            <h5 className="text-lg font-bold">{t('orderCard.orderTitle')} {order.order_id}</h5>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" outline onClick={toggleModal}>
              {t('orderCard.barcode')}
            </Button>
            <Dropdown label={selectedOption} dismissOnClick={false}>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market')}>
                Dexxos Market
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market #2')}>
                Dexxos Market #2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market #3')}>
                Dexxos Market #3
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market #4')}>
                Dexxos Market #4
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market #5')}>
                Dexxos Market #5
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Dexxos Market #6')}>
                Dexxos Market #6
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div className="p-4">
          <h6 className="font-semibold">{t('orderCard.orderDetails')}</h6>
          <ul className="divide-y divide-gray-200">
            {order.products.map((product) => (
              <li key={product.product_id} className="py-2 flex justify-between items-center">
                <span className="text-gray-700">
                  {product.name} x {product.quantity}
                </span>
                <span className="text-gray-900">${product.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="text-gray-700">{t('orderCard.subtotal')}</span>
              <span className="text-gray-900">${order.total_price}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-700">{t('orderCard.shipping')}</span>
              <span className="text-gray-900">${order.shipping_price}</span>
            </div>
            <div className="flex justify-between mt-2 font-semibold">
              <span className="text-gray-700">{t('orderCard.total')}</span>
              <span className="text-gray-900">${(parseFloat(order.total_price) + parseFloat(order.shipping_price)).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <p className="text-xs text-gray-500">
            {t('orderCard.updated')} <time dateTime="2023-11-23">{t('orderCard.updatedDate')}</time>
          </p>
        </div>
      </Card>
      {/* Barcode Modal */}
      <BarcodeModal isOpen={isModalOpen} toggleModal={toggleModal} barcode={order.barcode} />
    </>
  );
}
