const express = require('express');
const router = express.Router();
const {
    fetchProducts,
    fetchProductById,
} = require('../controllers/productController');

// Get all products
router.get('/', fetchProducts);

// Get product by ID
router.get('/:product_id', fetchProductById);

module.exports = router;
