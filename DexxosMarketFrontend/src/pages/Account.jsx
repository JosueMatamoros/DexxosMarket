import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import OrderCard from "../account/OrderCard";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useTranslation } from 'react-i18next';

export default function Account() {
  const { user } = useAuth0();
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation(); // Hook de i18next para traducciones

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${user.sub}`);
        const data = await response.json();
        console.log(data);

        // Verifica si `data` es un array antes de setearlo
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected data to be an array", data);
          setOrders([]); // Setea un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="account-page mt-3">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          {t('account.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/account">{t('account.account')}</Breadcrumb.Item>
        <Breadcrumb.Item>{t('account.orders')}</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="orders-container mt-5">
        {orders.map((order) => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  );
}
