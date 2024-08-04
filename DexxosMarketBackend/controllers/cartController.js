const pool = require('../config');

const fetchCartByUserId = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cart WHERE user_id = $1', [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addCartItem = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const result = await pool.query(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, product_id, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyCartItem = async (req, res) => {
    try {
        const { cart_item_id, quantity } = req.body;
        const result = await pool.query(
            'UPDATE cart SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
            [quantity, cart_item_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeCartItem = async (req, res) => {
    try {
        await pool.query('DELETE FROM cart WHERE cart_item_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchCartByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem
};
