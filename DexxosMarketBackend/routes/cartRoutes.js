const express = require('express');
const router = express.Router();
const {
    fetchCartItemsByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem
} = require('../controllers/cartController');

// Get all cart items by user_id
router.get('/:user_id', fetchCartItemsByUserId);

// Add a new item to cart
router.post('/', addCartItem);

// Update a cart item
router.put('/', modifyCartItem);

// Delete an item from cart
router.delete('/:user_id/:product_id', removeCartItem);

module.exports = router;
