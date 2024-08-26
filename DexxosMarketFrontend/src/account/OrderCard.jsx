import React from 'react';
import { Card, Button, Dropdown, Pagination } from 'flowbite-react';

export default function OrderCard({ order }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-start p-4 bg-gray-100">
        <div>
          <h5 className="text-lg font-bold">Order {order.order_id}</h5>
          <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" outline>
            Track Order
          </Button>
          <Dropdown label="More" dismissOnClick={false}>
            <Dropdown.Item>
              Edit
            </Dropdown.Item>
            <Dropdown.Item>
              Export
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              Trash
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="p-4">
        <h6 className="font-semibold">Order Details</h6>
        <ul className="divide-y divide-gray-200">
          {order.products.map((product) => (
            <li key={product.product_id} className="py-2 flex justify-between items-center">
              <span className="text-gray-700">
                {product.name} x {product.quantity}
              </span>
              <span className="text-gray-900">${product.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-900">${order.total_price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Shipping</span>
            <span className="text-gray-900">${order.shipping_price}</span>
          </div>
          <div className="flex justify-between mt-2 font-semibold">
            <span className="text-gray-700">Total</span>
            <span className="text-gray-900">${(parseFloat(order.total_price) + parseFloat(order.shipping_price)).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <p className="text-xs text-gray-500">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </p>
      </div>
    </Card>
  );
};

