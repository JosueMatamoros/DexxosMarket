import React from 'react';
import { Card } from "flowbite-react";
import { GoPlus } from "react-icons/go";

export default function ItemCart({ name, quantity, price, image }) {
  return (
    <Card className="w-full max-w-sm p-4">
      <div className="grid grid-cols-[100px_1fr] gap-4">
        <img
          src={image}
          alt="Product Image"
          className="w-32 h-32 object-cover rounded-lg shadow-md"
        />
        <div className="grid gap-2">
          <h3 className="font-medium text-sm">{name}</h3>
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
