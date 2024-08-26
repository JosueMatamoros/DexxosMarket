import React, { useState, useEffect, useContext } from 'react';
import { Drawer } from "flowbite-react";
import { BsCart2 } from "react-icons/bs";
import ItemCart from './ItemCart';
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from '../../context/CartContext';
import axios from "axios";

export default function ShoppingCart({ isOpen, toggleDrawer }) {
    const { user } = useAuth0();
    const { cartItems, fetchCartItems } = useContext(CartContext); // Usa el contexto para obtener los datos del carrito
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchCartItems(user.sub); // Usa la función del contexto para obtener los elementos del carrito
        }
    }, [user, fetchCartItems]);


    return (
        <Drawer open={isOpen} onClose={toggleDrawer} position="right">
            <Drawer.Header title="Shopping Cart" titleIcon={BsCart2} />
            <Drawer.Items>
                <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <ItemCart
                            key={item.product_id}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            image={item.image}
                            product_id={item.product_id}
                        />
                    ))}
                </div>
            </Drawer.Items>
        </Drawer>
    );
}
