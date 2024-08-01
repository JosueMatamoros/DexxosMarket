const express = require('express');
const router = express.Router();
const {
    fetchCartItems,
    fetchCartItemById,
    addCartItem,
    modifyCartItem,
    removeCartItem
} = require('../controllers/cartController');

// Get all cart items
router.get('/', fetchCartItems);

// Get cart item by id
router.get('/:cart_item_id', fetchCartItemById);

// Add new item to cart
router.post('/', addCartItem);

// Update item in cart
router.put('/:cart_item_id', modifyCartItem);

// Delete item from cart
router.delete('/:cart_item_id', removeCartItem);

module.exports = router;
