const express = require('express');
const router = express.Router();
const {
    fetchOrderDetails,
    fetchOrderDetailById,
    addOrderDetail,
    removeOrderDetail
} = require('../controllers/orderDetailController');

// Obtener todos los detalles de órdenes
router.get('/', fetchOrderDetails);

// Obtener detalle de orden por ID y producto
router.get('/:order_id/:product_id', fetchOrderDetailById);

// Crear nuevo detalle de orden
router.post('/', addOrderDetail);

// Eliminar detalle de orden
router.delete('/:order_id/:product_id', removeOrderDetail);

module.exports = router;
