import React from "react";
import { Card, Badge, Button } from "flowbite-react";

const ProductCard = ({ imgSrc, imgAlt, name, price}) => {
  return (
    <Card className="max-w-sm mr-4">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full h-48 object-cover"
      />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
        {name}
      </h5>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-semibold text-primary">${price.toFixed(2)}</span>
        <Button size="sm">Agregar</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
