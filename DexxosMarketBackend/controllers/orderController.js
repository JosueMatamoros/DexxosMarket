const pool = require('../config');

// Fetch all orders by user_id
const fetchOrderById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrder = async (req, res) => {
    try {
        const { user_id, barcode, total_price, shipping_price } = req.body;
        const result = await pool.query(
            'INSERT INTO orders (user_id, barcode, total_price, shipping_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, barcode, total_price, shipping_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeOrder = async (req, res) => {
    try {
        await pool.query('DELETE FROM orders WHERE order_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const modifyOrder = async (req, res) => {
    try {
        const { user_id, barcode, total_price, shipping_price } = req.body;
        const result = await pool.query(
            'UPDATE orders SET user_id = $1, barcode = $2, total_price = $3, shipping_price = $4 WHERE order_id = $5 RETURNING *',
            [user_id, barcode, total_price, shipping_price, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchOrderByBarcode = async (req, res) => {
    try {
        const barcode = req.params.barcode; // Obtener código de barras de los parámetros de la ruta
        const result = await pool.query('SELECT * FROM orders WHERE barcode = $1', [barcode]);
        const order = result.rows[0];
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    fetchOrderById,
    addOrder,
    removeOrder,
    modifyOrder,
    fetchOrderByBarcode
};
