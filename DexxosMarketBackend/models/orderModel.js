const pool = require('../config');

const getOrders = async () => {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
};

const getOrderById = async (id) => {
    const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    return result.rows[0];
};

const createOrder = async (order) => {
    const { user_id, barcode, total_price, shipping_price } = order;
    const result = await pool.query(
        'INSERT INTO orders (user_id, barcode, total_price, shipping_price) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, barcode, total_price, shipping_price]
    );
    return result.rows[0];
};

const updateOrder = async (id, order) => {
    const { user_id, barcode, total_price, shipping_price } = order;
    const result = await pool.query(
        'UPDATE orders SET user_id = $1, barcode = $2, total_price = $3, shipping_price = $4 WHERE order_id = $5 RETURNING *',
        [user_id, barcode, total_price, shipping_price, id]
    );
    return result.rows[0];
};

const deleteOrder = async (id) => {
    await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
