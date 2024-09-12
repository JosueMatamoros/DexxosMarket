import React, { useState, useEffect } from 'react';
import { Card } from "flowbite-react";
import { GoPlus } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { deeplApiKey } from '../../../API/deeplConfig';

export default function ItemCart({ name, quantity, price, image }) {
  const { i18n } = useTranslation();
  const [translatedName, setTranslatedName] = useState(name);

  useEffect(() => {
    const translateProductName = async () => {
      try {
        const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
          params: {
            auth_key: deeplApiKey,
            text: name,
            target_lang: i18n.language.toLocaleLowerCase(),
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

  return (
    <Card className="w-full max-w-sm p-4">
      <div className="grid grid-cols-[100px_1fr] gap-4">
        <img
          src={image}
          alt="Product Image"
          className="w-32 h-32 object-cover rounded-lg shadow-md"
        />
        <div className="grid gap-2">
          <h3 className="font-medium text-sm">{translatedName}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GoPlus className="w-4 h-4" />
            <span>{quantity}</span>
            <span>{`₡${price}`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
