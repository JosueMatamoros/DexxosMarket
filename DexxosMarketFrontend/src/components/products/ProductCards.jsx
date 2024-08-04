import React from 'react';
import { useThemeMode } from 'flowbite-react';
import Stars from './Stars';

function getRandomReviews() {
    return Math.floor(Math.random() * (700 - 50 + 1)) + 50;
}

export default function ProductCards({ imgSrc, imgAlt, name, price }) {
    const { mode } = useThemeMode();

    const rating = 3; // Puedes ajustar esto según sea necesario
    const reviews = getRandomReviews();
    
    return (
        <div className={`transition-colors duration-500 ease-in-out shadow-md rounded-lg w-full max-w-sm ${mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
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
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded">
                    Add to cart
                </button>
            </div>
        </div>
    );
}
