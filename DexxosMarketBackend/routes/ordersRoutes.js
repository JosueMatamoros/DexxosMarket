const express = require('express');
const router = express.Router();
const {
    fetchOrdersByUserId,
    fetchOrderByBarcode,
    addOrder
} = require('../controllers/orderController');

// Get all orders by user_id
router.get('/user/:user_id', fetchOrdersByUserId);

// Get order by barcode
router.get('/barcode/:barcode', fetchOrderByBarcode);

// Create a new order
router.post('/', addOrder);

module.exports = router;
