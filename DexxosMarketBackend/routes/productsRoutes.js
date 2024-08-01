const express = require('express');
const router = express.Router();
const {
    fetchProducts,
    fetchProductById,
    addProduct,
    modifyProduct,
    removeProduct
} = require('../controllers/productController');

// Obtener todos los productos
router.get('/', fetchProducts);

// Obtener producto por ID
router.get('/:id', fetchProductById);

// Crear nuevo producto
router.post('/', addProduct);

// Actualizar producto
router.put('/:id', modifyProduct);

// Eliminar producto
router.delete('/:id', removeProduct);

module.exports = router;
