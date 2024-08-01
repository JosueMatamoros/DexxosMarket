const pool = require('../config');

const getOrderDetails = async () => {
    const result = await pool.query('SELECT * FROM order_details');
    return result.rows;
};

const getOrderDetailById = async (order_id, product_id) => {
    const result = await pool.query(
        'SELECT * FROM order_details WHERE order_id = $1 AND product_id = $2',
        [order_id, product_id]
    );
    return result.rows[0];
};

const createOrderDetail = async (orderDetail) => {
    const { order_id, product_id } = orderDetail;
    const result = await pool.query(
        'INSERT INTO order_details (order_id, product_id) VALUES ($1, $2) RETURNING *',
        [order_id, product_id]
    );
    return result.rows[0];
};

const deleteOrderDetail = async (order_id, product_id) => {
    await pool.query(
        'DELETE FROM order_details WHERE order_id = $1 AND product_id = $2',
        [order_id, product_id]
    );
};

module.exports = {
    getOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    deleteOrderDetail
};
