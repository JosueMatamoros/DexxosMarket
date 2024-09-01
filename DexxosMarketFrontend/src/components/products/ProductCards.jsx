import React, { useState, useEffect, useContext } from 'react';
import { useThemeMode, Toast } from 'flowbite-react';
import { FaCheck } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from '../../context/CartContext';
import Stars from './Stars';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { deeplApiKey } from '../../../API/deeplConfig';

export default function ProductCards({ imgSrc, imgAlt, name, price, product_id, reviews_count }) {
    const { user } = useAuth0();
    const { mode } = useThemeMode();
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { t, i18n } = useTranslation();
    const [translatedName, setTranslatedName] = useState(name);

    const rating = 3; // Ajusta según sea necesario

    useEffect(() => {
        const translateProductName = async () => {
            try {
                const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
                    params: {
                        auth_key: deeplApiKey,
                        text: name,
                        target_lang: i18n.language.toLowerCase(),
                    },
                });
                setTranslatedName(response.data.translations[0].text);
            } catch (error) {
                console.error('Error translating product name:', error);
                setTranslatedName(name); // Si hay un error, se muestra el nombre original
            }
        };

        translateProductName();
    }, [i18n.language, name]);

    const handleAddToCartClick = () => {
        addToCart(user.sub, product_id, 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className={`transition-colors duration-500 ease-in-out shadow-md rounded-lg w-full max-w-sm ${mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            {showToast && (
                <div className="absolute bottom-4 right-4 z-50">
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                            <FaCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{t('productCards.productAdded')}</div>
                        <Toast.Toggle />
                    </Toast>
                </div>
            )}
            <div className="relative w-full h-0 pb-[100%] overflow-hidden"> {/* Contenedor cuadrado */}
                <img src={imgSrc} alt={imgAlt} className="absolute top-0 left-0 w-full h-full object-contain" />
            </div>
            <div className="p-4">
                <div className="space-y-2">
                    <h2 className={`text-lg font-bold`}>{translatedName}</h2>
                    <div className="flex items-center space-x-2">
                        <Stars rating={rating} reviews_count={reviews_count} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-500">₡{price}</span>
                        <span className="text-sm text-red-500">{t('productCards.sale')}</span>
                    </div>
                    <p className={`text-sm`}>{t('productCards.onlinePurchase')}</p>
                </div>
            </div>
            <div className="p-4">
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded" onClick={handleAddToCartClick}>
                    {t('productCards.addToCart')}
                </button>
            </div>
        </div>
    );
}
