const express = require('express');
const router = express.Router();
const {
    getImageByProductId,
    addProductImage
} = require('../controllers/productImageController'); // Asegúrate de que la ruta sea correcta

// Get image by product id
router.get('/:id/image', getImageByProductId);

// Add new image for product
router.post('/:id/image', addProductImage);

module.exports = router;
