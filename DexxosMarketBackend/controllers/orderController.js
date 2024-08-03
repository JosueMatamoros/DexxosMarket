const {
    getOrdersByUserId,
    getOrderByBarcode,
    createOrder
} = require('../models/orderModel');

// Fetch all orders by user_id
const fetchOrdersByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id; // Get user_id from route parameters
        const orders = await getOrdersByUserId(user_id); // Pass user_id to the model function
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch order by barcode
const fetchOrderByBarcode = async (req, res) => {
    try {
        const barcode = req.params.barcode; // Get barcode from route parameters
        const order = await getOrderByBarcode(barcode); // Pass barcode to the model function
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new order
const addOrder = async (req, res) => {
    try {
        const newOrder = await createOrder(req.body); // Create a new order with request body data
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchOrdersByUserId,
    fetchOrderByBarcode,
    addOrder
};
