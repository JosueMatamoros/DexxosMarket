const express = require('express');
const {
    fetchCartByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem
} = require('../controllers/cartController');

const router = express.Router();

// Get cart by user id
router.get('/:id', fetchCartByUserId);

// Add cart item
router.post('/', addCartItem);

// Update cart item
router.put('/', modifyCartItem);

// Delete cart item
router.delete('/:id', removeCartItem);

module.exports = router;
