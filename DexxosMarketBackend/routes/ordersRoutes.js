const express = require('express');
const router = express.Router();
const {
    fetchOrders,
    fetchOrderById,
    addOrder,
    modifyOrder,
    removeOrder
} = require('../controllers/orderController');

// Get all orders
router.get('/', fetchOrders);

// Get order by id
router.get('/:id', fetchOrderById);

// Create new order
router.post('/', addOrder);

// Update order
router.put('/:id', modifyOrder);

// Delete order
router.delete('/:id', removeOrder);

module.exports = router;
