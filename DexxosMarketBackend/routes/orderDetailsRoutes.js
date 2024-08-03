const express = require('express');
const router = express.Router();
const {
    fetchProductsByOrderId,
    removeProductFromOrder,
    addProductToOrder
} = require('../controllers/orderDetailController');

// Get all products by order_id
router.get('/:order_id', fetchProductsByOrderId);

// Delete product from order
router.delete('/:order_id/:product_id', removeProductFromOrder);

// Add product to order
router.post('/', addProductToOrder);

module.exports = router;
