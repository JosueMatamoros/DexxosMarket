const express = require('express');
const {
    fetchProducts,
    getImageByProductId,
    updateProductImage,
    fetchProductById,
    addProduct,
    modifyProduct,
    removeProduct
} = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/', fetchProducts);

// Get product by id
router.get('/:id', fetchProductById);

// Get product image by id
router.get('/:id/image', getImageByProductId);

// Create new product
router.post('/', addProduct);

// Update product
router.put('/:id', modifyProduct);

// Update product image
router.put('/:id/image', updateProductImage);

// Delete product
router.delete('/:id', removeProduct);

module.exports = router;
