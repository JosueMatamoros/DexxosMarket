const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../models/productModel');

const fetchProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addProduct = async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyProduct = async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeProduct = async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchProducts,
    fetchProductById,
    addProduct,
    modifyProduct,
    removeProduct
};
