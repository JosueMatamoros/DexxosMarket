const pool = require('../config');

const getOrdersByUserId = async (user_id) => { // Get orders by user id
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
    return result.rows;
};

const getOrderByBarcode = async (barcode) => { // Get order by barcode
    const result = await pool.query('SELECT * FROM orders WHERE barcode = $1', [barcode]);
    return result.rows[0];
};

const createOrder = async (order) => { // Add order to the database
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
