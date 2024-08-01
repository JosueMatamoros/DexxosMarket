const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../models/orderModel');

const fetchOrders = async (req, res) => {
    try {
        const orders = await getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchOrderById = async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrder = async (req, res) => {
    try {
        const newOrder = await createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyOrder = async (req, res) => {
    try {
        const updatedOrder = await updateOrder(req.params.id, req.body);
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeOrder = async (req, res) => {
    try {
        await deleteOrder(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchOrders,
    fetchOrderById,
    addOrder,
    modifyOrder,
    removeOrder
};
