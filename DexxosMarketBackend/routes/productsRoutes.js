const express = require('express');
const router = express.Router();
const {
    fetchProducts,
    fetchProductById,
    addProduct,
    modifyProduct,
    removeProduct
} = require('../controllers/productController');

// Get all products 
router.get('/', fetchProducts);

// Get product by id
router.get('/:id', fetchProductById);

// Create new product
router.post('/', addProduct);

// Update product
router.put('/:id', modifyProduct);

// Delete product
router.delete('/:id', removeProduct);

module.exports = router;
