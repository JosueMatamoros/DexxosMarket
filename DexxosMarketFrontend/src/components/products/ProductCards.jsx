import React, {useState, useContext}from 'react';
import { useThemeMode, Toast } from 'flowbite-react';
import { FaCheck } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from '../../context/CartContext';
import Stars from './Stars';

function getRandomReviews() {
    return Math.floor(Math.random() * (700 - 50 + 1)) + 50;
}

export default function ProductCards({ imgSrc, imgAlt, name, price, product_id, }) {
    const { user } = useAuth0();
    const { mode } = useThemeMode();
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useContext(CartContext); // Usa la función addToCart del contexto

    const rating = 3; // Puedes ajustar esto según sea necesario
    const reviews = getRandomReviews();

    const handleAddToCartClick = () => {
        console.log(product_id)
        addToCart(user.sub, product_id, 1); // Llama a addToCart con la información necesaria
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Ocultar el toast después de 3 segundos
    };
    
    return (
        <div className={`transition-colors duration-500 ease-in-out shadow-md rounded-lg w-full max-w-sm ${mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            {showToast && (
                <div className="absolute bottom-4 right-4 z-50">
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                            <FaCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">Producto agregado al carrito.</div>
                        <Toast.Toggle />
                    </Toast>
                </div>
            )}
            <div className="relative w-full h-0 pb-[100%] overflow-hidden"> {/* Contenedor cuadrado */}
                <img src={imgSrc} alt={imgAlt} className="absolute top-0 left-0 w-full h-full object-contain" />
            </div>
            <div className="p-4">
                <div className="space-y-2">
                    <h2 className={`text-lg font-bold`}>{name}</h2>
                    <div className="flex items-center space-x-2">
                        <Stars rating={rating} reviews={reviews} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-500">₡{price}</span>
                        <span className="text-sm text-red-500">Sale</span>
                    </div>
                    <p className={`text-sm`}>When purchased online</p>
                </div>
            </div>
            <div className="p-4">
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded" onClick={handleAddToCartClick}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}
