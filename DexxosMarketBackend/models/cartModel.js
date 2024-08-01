const pool = require('../config');

const getCartItems = async () => {
    const result = await pool.query('SELECT * FROM cart');
    return result.rows;
};

const getCartItemById = async (cart_item_id) => {
    const result = await pool.query('SELECT * FROM cart WHERE cart_item_id = $1', [cart_item_id]);
    return result.rows[0];
};

const createCartItem = async (cartItem) => {
    const { user_id, product_id, quantity } = cartItem;
    const result = await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [user_id, product_id, quantity]
    );
    return result.rows[0];
};

const updateCartItem = async (cart_item_id, cartItem) => {
    const { user_id, product_id, quantity } = cartItem;
    const result = await pool.query(
        'UPDATE cart SET user_id = $1, product_id = $2, quantity = $3 WHERE cart_item_id = $4 RETURNING *',
        [user_id, product_id, quantity, cart_item_id]
    );
    return result.rows[0];
};

const deleteCartItem = async (cart_item_id) => {
    await pool.query('DELETE FROM cart WHERE cart_item_id = $1', [cart_item_id]);
};

module.exports = {
    getCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem
};
