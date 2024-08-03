const pool = require('../config');

const getProductByUserId = async (user_id) => { // Get product by user id
    const result = await pool.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
    return result.rows;
};

const createCartItem = async (cartItem) => { 
    const { user_id, product_id, quantity } = cartItem;
    const result = await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [user_id, product_id, quantity]
    );
    return result.rows[0];
};

const updateCartItem = async (cartItem) => { // Update cart item
    const { user_id, product_id, quantity } = cartItem;
    const result = await pool.query(
        'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, user_id, product_id]
    );
    return result.rows[0];
};

const deleteCartItem = async (user_id, product_id) => { // Delete cart item
    const result = await pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *', [
        user_id,
        product_id
    ]);
    return result.rows[0];
};

module.exports = {

    getProductByUserId,
    createCartItem,
    updateCartItem,
    deleteCartItem
};
