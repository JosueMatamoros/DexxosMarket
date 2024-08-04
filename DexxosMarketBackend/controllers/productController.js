const {
    getProducts,
    getProductById,
} = require('../models/productModel');

// Fetch all products
const fetchProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch product by ID
const fetchProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.product_id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    fetchProducts,
    fetchProductById,
};
