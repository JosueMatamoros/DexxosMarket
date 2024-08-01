const express = require('express');
const router = express.Router();
const {
    fetchOrderDetails,
    fetchOrderDetailById,
    addOrderDetail,
    removeOrderDetail
} = require('../controllers/orderDetailController');

// Get all order details
router.get('/', fetchOrderDetails);

// Get order detail by id
router.get('/:order_id/:product_id', fetchOrderDetailById);

// Add new order detail
router.post('/', addOrderDetail);

// Delete order detail
router.delete('/:order_id/:product_id', removeOrderDetail);

module.exports = router;
