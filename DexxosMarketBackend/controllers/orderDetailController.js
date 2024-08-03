const {
    getProductsByOrderId,
    deleteProductFromOrder,
    createProductToOrder
} = require('../models/orderDetailModel');

// Fetch all products by order_id
const fetchProductsByOrderId = async (req, res) => {
    try {
        const order_id = req.params.order_id; // Get order_id from route parameters
        const products = await getProductsByOrderId(order_id); // Pass order_id to the model function
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete product from order
const removeProductFromOrder = async (req, res) => {
    try {
        const { order_id, product_id } = req.params; // Get order_id and product_id from route parameters
        await deleteProductFromOrder(order_id, product_id); // Pass order_id and product_id to the model function
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add product to order
const addProductToOrder = async (req, res) => {
    try {
        const { order_id, product_id, quantity } = req.body; // Get order_id, product_id, and quantity from request body
        await createProductToOrder(order_id, product_id, quantity); // Pass order_id, product_id, and quantity to the model function
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchProductsByOrderId,
    removeProductFromOrder,
    addProductToOrder
};
