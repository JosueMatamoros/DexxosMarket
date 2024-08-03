const pool = require('../config');


const getProductsByOrderId = async (order_id) => { // Get all products by order_id
    const result = await pool.query(
        'SELECT * FROM order_details WHERE order_id = $1',
        [order_id]
    );
    return result.rows;
}

const deleteProductFromOrder = async (order_id, product_id) => { //// Delete product from order
    await pool.query(
        'DELETE FROM order_details WHERE order_id = $1 AND product_id = $2',
        [order_id, product_id]
    );
}

const createProductToOrder = async (order_id, product_id, quantity) => { // Add product to order
    await pool.query(
        'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [order_id, product_id, quantity]
    );
}

module.exports = {
    getProductsByOrderId,
    deleteProductFromOrder,
    createProductToOrder
};
