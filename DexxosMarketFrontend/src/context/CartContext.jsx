import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = useCallback(async (user_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${user_id}`);
            console.log('Response from fetching cart items:', response.data);
    
            if (response.data && response.data.length > 0) {
                setCartItems(response.data);
            } else {
                console.warn('No products found in the cart.');
                setCartItems([]); // O manejarlo de otra manera, por ejemplo, establecer un estado de vacío
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setCartItems([]); // También puedes manejar el estado en caso de error
        }
    }, [setCartItems]);

    const addToCart = async (user_id, product_id, quantity) => {
        try {
            const response = await axios.post('http://localhost:5000/cart/', { user_id, product_id, quantity });
            console.log('Response from adding to cart:', response.data);
            fetchCartItems(user_id);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeCartItem = async (userId, productId) => {
        try {
            await axios.delete('http://localhost:5000/cart/remove', { data: { userId, productId } });
            setCartItems((prevItems) => prevItems.filter((item) => item.ProductID !== productId));
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const updateCartItemQuantity = async (userId, productId, quantity) => {
        try {
            await axios.put('http://localhost:5000/cart/update', { userId, productId, quantity });
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.ProductID === productId ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, fetchCartItems, updateCartItemQuantity, removeCartItem, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};