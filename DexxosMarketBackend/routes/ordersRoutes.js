const express = require('express');
const router = express.Router();
const {
    fetchOrders,
    fetchOrderById,
    addOrder,
    modifyOrder,
    removeOrder
} = require('../controllers/orderController');

// Obtener todas las órdenes
router.get('/', fetchOrders);

// Obtener orden por ID
router.get('/:id', fetchOrderById);

// Crear nueva orden
router.post('/', addOrder);

// Actualizar orden
router.put('/:id', modifyOrder);

// Eliminar orden
router.delete('/:id', removeOrder);

module.exports = router;
