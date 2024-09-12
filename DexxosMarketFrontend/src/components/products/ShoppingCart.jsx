import React, { useState, useEffect, useContext } from 'react';
import { Drawer, Button } from "flowbite-react";
import { BsCart2 } from "react-icons/bs";
import ItemCart from './ItemCart';
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from '../../context/CartContext';
import ConfirmationModal from './ConfirmationModal';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { deeplApiKey } from '../../../API/deeplConfig'; // Importar la API Key

export default function ShoppingCart({ isOpen, toggleDrawer }) {
    const { user } = useAuth0();
    const { cartItems, fetchCartItems } = useContext(CartContext); // Usa el contexto para obtener los datos del carrito
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation(); // Hook de i18next para traducciones
    const [translatedCartItems, setTranslatedCartItems] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCartItems(user.sub); // Usa la función del contexto para obtener los elementos del carrito
        }
    }, [user, fetchCartItems]);

    useEffect(() => {
        const translateCartItems = async () => {
            const translated = await Promise.all(cartItems.map(async (item) => {
                try {
                    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
                        params: {
                            auth_key: deeplApiKey,
                            text: item.name,
                            target_lang: i18n.language.toLowerCase(),
                        },
                    });

                    return {
                        ...item,
                        name: response.data.translations[0].text,
                    };
                } catch (error) {
                    console.error('Error translating product name:', error);
                    return item; // En caso de error, devuelve el item sin traducir
                }
            }));

            setTranslatedCartItems(translated);
        };

        translateCartItems();
    }, [i18n.language, cartItems]);

    // Calcula el precio total
    const totalPrice = translatedCartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <Drawer open={isOpen} onClose={toggleDrawer} position="right">
            <Drawer.Header title={t('shoppingCart.title')} titleIcon={BsCart2} />
            <Drawer.Items>
                <div className="flex flex-col gap-4">
                    {translatedCartItems.map((item) => (
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
                {/* Sección para el precio total y el botón de pagar */}
                <div className="mt-4 p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">{t('shoppingCart.total')}</span>
                        <span className="text-lg font-semibold">₡{totalPrice.toFixed(2)}</span>
                    </div>
                    {/*Centrar el Confirmation Modal*/}
                    <div className="flex justify-center">
                        <ConfirmationModal isOpen={isOpen} toggleDrawer={toggleDrawer} />
                    </div>
                </div>
            </Drawer.Items>
        </Drawer>
    );
}
