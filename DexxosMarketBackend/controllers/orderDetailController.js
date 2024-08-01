const {
    getOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    deleteOrderDetail
} = require('../models/orderDetailModel');

const fetchOrderDetails = async (req, res) => {
    try {
        const orderDetails = await getOrderDetails();
        res.json(orderDetails);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchOrderDetailById = async (req, res) => {
    try {
        const orderDetail = await getOrderDetailById(req.params.order_id, req.params.product_id);
        res.json(orderDetail);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrderDetail = async (req, res) => {
    try {
        const newOrderDetail = await createOrderDetail(req.body);
        res.status(201).json(newOrderDetail);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeOrderDetail = async (req, res) => {
    try {
        await deleteOrderDetail(req.params.order_id, req.params.product_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchOrderDetails,
    fetchOrderDetailById,
    addOrderDetail,
    removeOrderDetail
};
