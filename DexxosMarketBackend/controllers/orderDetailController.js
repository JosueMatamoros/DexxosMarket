const pool = require('../config');

const fetchOrderDetailsByOrderId = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM order_details WHERE order_id = $1', [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrderDetails = async (req, res) => {
    try {
        const { product_id, order_id, quantity } = req.body;
        const result = await pool.query(
            'INSERT INTO order_details (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [product_id, order_id, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeOrderDetail = async (req, res) => {
    try {
        const { product_id, order_id } = req.body; // Obtener product_id y order_id del cuerpo de la solicitud
        const result = await pool.query(
            'DELETE FROM order_details WHERE product_id = $1 AND order_id = $2 RETURNING *',
            [product_id, order_id]
        );
        if (result.rowCount > 0) {
            res.status(204).send(); // Enviar respuesta sin contenido si se eliminó correctamente
        } else {
            res.status(404).send('Order detail not found'); // Enviar respuesta 404 si no se encontró la relación
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    fetchOrderDetailsByOrderId,
    addOrderDetails,
    removeOrderDetail,
};
