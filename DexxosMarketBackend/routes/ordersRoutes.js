const express = require('express');
const {
    fetchOrderById,
    addOrder,
    modifyOrder,
    removeOrder,
    fetchOrderByBarcode
} = require('../controllers/orderController');

const router = express.Router();

// Get order by id
router.get('/:user_id', fetchOrderById);

// Create new order
router.post('/:user_id', addOrder);

// Update order
router.put('/:id', modifyOrder);

// Delete order
router.delete('/:id', removeOrder);

router.get('/barcode/:barcode', fetchOrderByBarcode);

module.exports = router;
