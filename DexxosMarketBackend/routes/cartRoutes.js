const express = require('express');
const router = express.Router();
const {
    fetchCartItems,
    fetchCartItemById,
    addCartItem,
    modifyCartItem,
    removeCartItem
} = require('../controllers/cartController');

// Obtener todos los elementos del carrito
router.get('/', fetchCartItems);

// Obtener elemento del carrito por ID
router.get('/:cart_item_id', fetchCartItemById);

// Crear nuevo elemento del carrito
router.post('/', addCartItem);

// Actualizar elemento del carrito
router.put('/:cart_item_id', modifyCartItem);

// Eliminar elemento del carrito
router.delete('/:cart_item_id', removeCartItem);

module.exports = router;
