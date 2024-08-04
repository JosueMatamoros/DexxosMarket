const express = require('express');
const {
    fetchOrderDetailsByOrderId,
    addOrderDetails,
    removeOrderDetail,
} = require('../controllers/orderDetailController');

const router = express.Router();

// Get order details by order id
router.get('/:id', fetchOrderDetailsByOrderId);

// Add order details
router.post('/', addOrderDetails);

router.delete('/', removeOrderDetail);

module.exports = router;
