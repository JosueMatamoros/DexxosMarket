import React from 'react'
import ThemeProvider from '../../context/ThemeProvider';
import { useThemeMode } from 'flowbite-react';
import Stars from './Stars'
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";

function getRandomReviews() {
    
    return Math.floor(Math.random() * (700 - 50 + 1)) + 50;
}

export default function ProductCards({ imgSrc, imgAlt, name, price }) {
    const { mode } = useThemeMode();
    const textColor = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const mutedTextColor = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';

    const rating = 3; // Puedes ajustar esto según sea necesario
    const reviews = getRandomReviews();
    return (
        <div className={`bg-white shadow-md rounded-lg w-full max-w-sm ${mode === 'dark' ? 'bg-white' : 'bg-white'}`}>
          <div className="flex flex-col items-center p-4">
            <img src={imgSrc} alt={imgAlt} className="w-full h-auto aspect-square" width="150" height="150" />
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <h2 className={`text-lg font-bold ${textColor}`}>{name}</h2>
              <div className="flex items-center space-x-2">
                <Stars rating={rating} reviews={reviews} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-500">${price}</span>
                <span className="text-sm text-red-500">Sale</span>
              </div>
              <p className={`text-sm ${mutedTextColor}`}>When purchased online</p>
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
