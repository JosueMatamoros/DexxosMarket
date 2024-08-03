const pool = require('../config');

const getOrdersByUserId = async (user_id) => {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
    return result.rows;
};

const getOrderByBarcode = async (barcode) => {
    const result = await pool.query('SELECT * FROM orders WHERE barcode = $1', [barcode]);
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

module.exports = {
    getOrdersByUserId,
    getOrderByBarcode,
    createOrder
};
